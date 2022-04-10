import { BigNumber, Contract, ContractInterface } from 'ethers';
import { Bond, BondOpts } from "./bond";
import { IBlockchain } from "@models/blockchain";
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { getBondAddresses } from "@services/helpers/get-bond-addresses";
import { LPTokenContract, StableBondContract, TokenContract } from '@services/abi';
import { getNativeCurrencyInUSDC, getTokenInNativeCurrency } from '@services/helpers';
import network from '@services/common/network';
import { getToken } from '@services/helpers/get-token';

export interface StableBondOpts extends BondOpts {
  readonly reserveContractAbi: ContractInterface;
  readonly tokensInStrategy?: string;
}
// These are special bonds that have different valuation methods
export interface CustomBondOpts extends StableBondOpts { }

export class StableBond extends Bond {
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
  
  public async getTreasuryBalance (
    networkID: IBlockchain.NetworksEnum,
    provider: StaticJsonRpcProvider,
  ): Promise<number> {
    let result: number = 0;
    const addresses: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
    const bondTokenAddress: string = getToken(this.id, 'address');
    const tokenContract: Contract = new Contract(bondTokenAddress, TokenContract, provider);
    const tokenBalanceOf = await tokenContract.balanceOf(addresses.TREASURY_ADDRESS);
    
    if (this.id === 'USDC') {
      result = tokenBalanceOf / Math.pow(10, 6);
    } else if (this.isWrap) {
      result = (tokenBalanceOf / Math.pow(10, 18)) * (await getNativeCurrencyInUSDC(networkID, provider));
    } else if (this.isLP) {
      const lpContractAddress: string = '0x659BB25B9308bfA16F5ea8d452b9a2BbaE84F60F';
      const lpContract = new Contract(lpContractAddress, LPTokenContract, provider);
      const lpBalanceOf = await lpContract.balanceOf(addresses.TREASURY_ADDRESS);
  
      let lpPriceInUSDC;
      const [reserve0, reserve1] = await lpContract.getReserves();
      const totalSupply: number = (await lpContract.totalSupply());
      const lp0Address: string = (await lpContract.token0()).toLowerCase();
      const lp1Address: string = (await lpContract.token1()).toLowerCase();
      const tokens: IBlockchain.IToken[] = network().getCurrentNetworkTokens || [];
  
      const wrapTokenAddress: string | undefined = tokens
        .find(({ isWrap }: IBlockchain.IToken) => isWrap)?.address.toLowerCase();
      
      if (wrapTokenAddress) {
        if (lp0Address === wrapTokenAddress) {
          lpPriceInUSDC = ((((reserve0 / Math.pow(10, 18)) * 2) * (await getNativeCurrencyInUSDC(networkID, provider))) / (totalSupply / Math.pow(10, 18)));
        } else if (lp1Address === wrapTokenAddress) {
          lpPriceInUSDC = ((((reserve1 / Math.pow(10, 18)) * 2) * (await getNativeCurrencyInUSDC(networkID, provider))) / (totalSupply / Math.pow(10, 18)));
  
        } else {
          throw new Error('------ error');
        }
      } else {
        throw new Error('00000 Error');
      }
      result = (lpBalanceOf / Math.pow(10, 18)) * lpPriceInUSDC;
    } else {
      const tokenPriceInUSDC: number = (await getTokenInNativeCurrency(this.id, networkID, provider)) * (await getNativeCurrencyInUSDC(networkID, provider));
      result = tokenBalanceOf / Math.pow(10, 18) * tokenPriceInUSDC
    }
  
    console.groupEnd();
  
    return result;
    
    /* const addresses: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
    const tokens: IBlockchain.IToken[] = network().getCurrentNetworkTokens || [];
    const bondTokenAddress: string = getToken(this.id, 'address');
  
    // console.log('bondTokenAddress: ', bondTokenAddress);
    
    // #TODO CHECK
    // const wrapTokenAddress: string = tokens.find(({ isWrap }: IBlockchain.IToken) => isWrap)?.address || 'unknown';
    const tokenContract: Contract = new Contract(bondTokenAddress, TokenContract, provider);
    let tokenAmount = await tokenContract.balanceOf(addresses.TREASURY_ADDRESS);
    let result: number;
  
    if (this.tokensInStrategy) {
      tokenAmount = BigNumber.from(tokenAmount).add(BigNumber.from(this.tokensInStrategy)).toString();
    }
    
    // eslint-disable-next-line prefer-const
    if (this.isWrap) {
      result = (tokenAmount / Math.pow(10, 18) * (await getNativeCurrencyInUSDC(networkID, provider)));
    } else if (this.bondToken === 'USDC') {
      result = tokenAmount / Math.pow(10, 6);
    } else {
      result = (tokenAmount / Math.pow(10, 18) * (await getNativeCurrencyInUSDC(networkID, provider))) * (await getTokenInNativeCurrency(this.id, networkID, provider));
    }
    
    return result; */
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
      return tokenAmount * tokenPrice;
    };
  }
}
