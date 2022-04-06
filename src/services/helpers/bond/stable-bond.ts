import { BigNumber, Contract, ContractInterface } from 'ethers';
import { Bond, BondOpts } from "./bond";
import { IBlockchain } from "@models/blockchain";
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { getBondAddresses } from "@constants/addresses";

export interface StableBondOpts extends BondOpts {
  readonly reserveContractAbi: ContractInterface;
  readonly tokensInStrategy?: string;
}
// These are special bonds that have different valuation methods
export interface CustomBondOpts extends StableBondOpts { }

export class StableBond extends Bond {
  readonly isLP: boolean = false;
  readonly reserveContractAbi: ContractInterface;
  readonly displayUnits: string;
  readonly tokensInStrategy?: string;
  
  constructor(stableBondOpts: StableBondOpts) {
    super(IBlockchain.WTF_BondEnum.StableAsset, stableBondOpts);
    
    // For stable bonds the display units are the same as the actual token
    this.displayUnits = stableBondOpts.displayName;
    this.reserveContractAbi = stableBondOpts.reserveContractAbi;
    this.tokensInStrategy = stableBondOpts.tokensInStrategy;
  }
  
  public async getTreasuryBalance(
    networkID: IBlockchain.NetworksEnum,
    provider: StaticJsonRpcProvider
  ): Promise<number> {
    const addresses = getBondAddresses(networkID);
    const token: Contract = this.getContractForReserve(networkID, provider);
    let tokenAmount = await token.balanceOf(addresses.TREASURY_ADDRESS);
    
    if (this.tokensInStrategy) {
      tokenAmount = BigNumber.from(tokenAmount).add(BigNumber.from(this.tokensInStrategy)).toString();
    }
    return tokenAmount / Math.pow(10, 18);
  }
  
  public async getTokenAmount(networkID: IBlockchain.NetworksEnum, provider: StaticJsonRpcProvider): Promise<number> {
    return this.getTreasuryBalance(networkID, provider);
  }
  
  public getTimeAmount(networkID: IBlockchain.NetworksEnum, provider: StaticJsonRpcProvider): Promise<number> {
    return new Promise<number>(reserve => reserve(0));
  }
}

export class CustomBond extends StableBond {
  constructor(customBondOpts: CustomBondOpts) {
    super(customBondOpts);
    
    this.getTreasuryBalance = async (
      networkID: IBlockchain.NetworksEnum,
      provider: StaticJsonRpcProvider
    ): Promise<number> => {
      const tokenAmount: number = await super.getTreasuryBalance(networkID, provider);
      const tokenPrice: number = this.getTokenPrice();
      
      return tokenAmount * tokenPrice;
    };
  }
}
