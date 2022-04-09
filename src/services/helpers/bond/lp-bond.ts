import { ContractInterface, Contract } from "ethers";
import { Bond, BondOpts } from "./bond";
import { IBlockchain } from "@models/blockchain";
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { getBondCalculator } from "../bond-calculator";
import { getBondAddresses } from "@services/helpers/get-bond-addresses";

// Keep all LP specific fields/logic within the LPBond class
export interface LPBondOpts extends BondOpts {
  readonly reserveContractAbi: ContractInterface;
  readonly lpUrl: string;
}

export class LPBond extends Bond {
  readonly isLP = true;
  readonly lpUrl: string;
  readonly reserveContractAbi: ContractInterface;
  readonly displayUnits: string;
  
  constructor(lpBondOpts: LPBondOpts) {
    super(IBlockchain.WTF_BondEnum.LP, lpBondOpts);
    
    this.lpUrl = lpBondOpts.lpUrl;
    this.reserveContractAbi = lpBondOpts.reserveContractAbi;
    this.displayUnits = "LP";
  }

  async getTreasuryBalance(networkID: IBlockchain.NetworksEnum, provider: StaticJsonRpcProvider) {
    const addresses = getBondAddresses(networkID);
    
    const token = this.getContractForReserve(networkID, provider);
    const tokenAddress = this.getAddressForReserve(networkID);
    const bondCalculator = getBondCalculator(networkID, provider);
    const tokenAmount = await token.balanceOf(addresses.TREASURY_ADDRESS);
    const valuation = await bondCalculator.valuation(tokenAddress, tokenAmount);
    const markdown = await bondCalculator.markdown(tokenAddress);
    const tokenUSD: number = (valuation / Math.pow(10, 9)) * (markdown / Math.pow(10, 18));
    
    return tokenUSD;
  }
  
  public getTokenAmount(networkID: IBlockchain.NetworksEnum, provider: StaticJsonRpcProvider) {
    return this.getReserves(networkID, provider, true);
  }
  
  public getBigAmount(networkID: IBlockchain.NetworksEnum, provider: StaticJsonRpcProvider) {
    return this.getReserves(networkID, provider, false);
  }
  
  private async getReserves(networkID: IBlockchain.NetworksEnum, provider: StaticJsonRpcProvider, isToken: boolean): Promise<number> {
    const addresses = getBondAddresses(networkID);
    const token: Contract = this.getContractForReserve(networkID, provider);
    
    const [reserve0, reserve1]: number[] = await token.getReserves();
    const token1: string = await token.token1();
    const isBig: boolean = token1.toLowerCase() === addresses.BIG_ADDRESS.toLowerCase();
    
    let result: number;
    
    if (isToken) {
      result = this.toTokenDecimal(false, isBig ? reserve0 : reserve1)
    } else {
      result = this.toTokenDecimal(true, isBig ? reserve1 : reserve0)
    }
    
    return result;
  }
  
  private toTokenDecimal(isBig: boolean, reserve: number): number {
    return isBig ? reserve / Math.pow(10, 9) : reserve / Math.pow(10, 18);
  }
}

// These are special bonds that have different valuation methods
export interface CustomLPBondOpts extends LPBondOpts {
}

export class CustomLPBond extends LPBond {
  constructor(customBondOpts: CustomLPBondOpts) {
    super(customBondOpts);
    
    this.getTreasuryBalance = async (networkID: IBlockchain.NetworksEnum, provider: StaticJsonRpcProvider) => {
      const tokenAmount = await super.getTreasuryBalance(networkID, provider);
      const tokenPrice = this.getTokenPrice();
      
      return tokenAmount * tokenPrice;
    };
    
    this.getTokenAmount = async (networkID: IBlockchain.NetworksEnum, provider: StaticJsonRpcProvider) => {
      const tokenAmount = await super.getTokenAmount(networkID, provider);
      const tokenPrice = this.getTokenPrice();
      
      return tokenAmount * tokenPrice;
    };
  }
}