import { BigNumber, Contract, ContractInterface } from 'ethers';
import { Bond, BondOpts } from "./bond";
import { IBlockchain } from "@models/blockchain";
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { getBondAddresses } from "@services/helpers/get-bond-addresses";
import { TokenContract } from '@services/abi';
import { getNativeCurrencyInUSDC } from '@services/helpers';
import * as net from 'net';
import network from '@services/common/network';

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
    const addresses: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
    const tokens: IBlockchain.IToken[] = network().getCurrentNetworkTokens || [];
    const wrapTokenAddress: string = tokens.find(({ isWrap }: IBlockchain.IToken) => isWrap)?.address || 'unknown';
    const tokenContract: Contract = new Contract(wrapTokenAddress, TokenContract, provider);
    let tokenAmount = await tokenContract.balanceOf(addresses.TREASURY_ADDRESS);
  
    if (this.tokensInStrategy) {
      tokenAmount = BigNumber.from(tokenAmount).add(BigNumber.from(this.tokensInStrategy)).toString();
    }
    
    return (tokenAmount / Math.pow(10, 18) * (await getNativeCurrencyInUSDC(networkID, provider)));
  }
  
  public async getTokenAmount(networkID: IBlockchain.NetworksEnum, provider: StaticJsonRpcProvider): Promise<number> {
    return this.getTreasuryBalance(networkID, provider);
  }
  
  public getBigAmount(networkID: IBlockchain.NetworksEnum, provider: StaticJsonRpcProvider): Promise<number> {
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
      // #TODO error
      const tokenPrice: number = this.getTokenPrice();
  
      console.log('[CustomBond] tokenAmount, tokenPrice: ', tokenAmount, tokenPrice);
      
      return tokenAmount * tokenPrice;
    };
  }
}
