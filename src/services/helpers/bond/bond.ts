import { IBlockchain } from '@models/blockchain';
import { Contract, ContractInterface } from 'ethers';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { getTokenPrice } from '@services/helpers/token-price';
import { IBond } from '@models/bond';
import { getToken } from '@services/helpers/get-token';
import { getBondAddresses, getNativeCurrencyInUSDC, getTokenInNativeCurrency } from '@services/helpers';
import { LPTokenContract, TokenContract } from '@services/abi';
import network from '@services/common/network';

export interface BondOpts {
  readonly id: IBond.IBondType; // Internal name used for references
  readonly bondIconSvg: string; //  SVG path for icons
  readonly bondContractABI: ContractInterface; // ABI for contract
  readonly bondToken: IBlockchain.TokenType; // Unused, but native token to buy the bond.
  readonly bondAddress: string;
  readonly displayName: string; // Displayname on UI
  readonly reserveContractAbi: ContractInterface;
  readonly isLP?: boolean;
  readonly lpUrl?: string;
  readonly isWrap?: boolean;
  readonly tokensInStrategy?: string;
}

export class Bond {
  public readonly id: IBond.IBondType;
  public readonly displayName: string;
  public readonly bondIconSvg: string;
  public readonly bondContractABI: ContractInterface; // Bond ABI
  public readonly bondToken: IBlockchain.TokenType;
  public readonly bondAddress: string;
  public readonly reserveContractAbi: ContractInterface;
  public readonly displayUnits: string;
  public readonly isWrap?: boolean;
  public readonly isLP?: boolean;
  public readonly lpUrl?: string;
  public readonly tokensInStrategy?: string;

  constructor(bondOpts: BondOpts) {
    const {
      id, displayName, bondIconSvg, bondContractABI, bondToken, lpUrl, tokensInStrategy, isLP, isWrap,
      bondAddress, reserveContractAbi
    } = bondOpts;
    this.id = id;
    this.displayName = displayName;
    this.bondIconSvg = bondIconSvg;
    this.bondContractABI = bondContractABI;
    this.bondToken = bondToken;
    this.isWrap = isWrap;
    this.bondAddress = bondAddress;
    this.isLP = isLP;
    this.lpUrl = lpUrl;
    this.displayUnits = displayName;
    this.reserveContractAbi = reserveContractAbi;
    this.tokensInStrategy = tokensInStrategy;
  }
  
  public async getTokenAmount(networkID: number, provider: StaticJsonRpcProvider): Promise<number> {
    return this.getTreasuryBalance(networkID, provider);
  }
  
  public getBigAmount(networkID: number, provider: StaticJsonRpcProvider): Promise<number> {
    return new Promise<number>(reserve => reserve(0));
  }
  
  public async getTreasuryBalance(
    networkID: number,
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
  }
  
  protected getTokenPrice(): number {
    return getTokenPrice(this.bondToken);
  }
  
  get getReserveAddress(): string {
    return getToken(this.bondToken, 'address');
  }
}
