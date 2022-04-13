import { IBlockchain } from '@models/blockchain';
import { Contract, ContractInterface } from 'ethers';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { getTokenPrice } from '@services/helpers/token-price';
import { IBond } from '@models/bond';
import { getToken } from '@services/helpers/get-token';
import { getBondAddresses, sleep } from '@services/helpers';
import { LPTokenContract, StableBondContract, StableReserveContract, TokenContract } from '@services/abi';
import network from '@services/common/network';
import { getReserves } from '@services/helpers/get-reserves';
import { getNativeCurrencyInUSDC } from '@services/common/prices/get-native-currency-in-usdc'
import { getTokenInNativeCurrency } from '@services/common/prices/get-token-in-native-currency'
import getCrvTreasuryBalance from '@services/helpers/get-crv-treasury-balance';

export interface BondOpts {
  readonly id: IBond.IBondType; // Internal name used for references
  readonly bondIconSvg: string; //  SVG path for icons
  readonly bondAddress: string;
  readonly isLP?: boolean;
  readonly lpUrl?: string;
  readonly isWrap?: boolean;
  readonly tokensInStrategy?: string;
  readonly displayName?: string; // Display name on UI
  readonly networkType?: IBlockchain.NetworkType;
  readonly reserveContractAbi?: ContractInterface;
  readonly bondContractABI?: ContractInterface; // ABI for contract
  readonly bondToken?: IBlockchain.TokenType; // Unused, but native token to buy the bond.
}

export class Bond {
  public readonly id: IBond.IBondType;
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
  public readonly networkType?: IBlockchain.NetworkType;
  public readonly displayName?: string; // Display name on UI

  constructor(bondOpts: BondOpts) {
    const {
      id, displayName, bondIconSvg, bondContractABI, bondToken, lpUrl, tokensInStrategy, isLP, isWrap,
      bondAddress, reserveContractAbi, networkType,
    } = bondOpts;
    this.id = id;
    this.displayName = displayName || id;
    this.bondIconSvg = bondIconSvg;
    this.bondContractABI = bondContractABI || StableBondContract;
    this.bondToken = bondToken || id;
    this.isWrap = isWrap;
    this.bondAddress = bondAddress;
    this.isLP = isLP;
    this.lpUrl = lpUrl;
    this.displayUnits = displayName || id;
    this.reserveContractAbi = reserveContractAbi || StableReserveContract;
    this.tokensInStrategy = tokensInStrategy;
    this.networkType = networkType;
  }
  
  public async getTokenAmount(networkID: number, provider: StaticJsonRpcProvider): Promise<number> {
    return this.getTreasuryBalance(networkID, provider);
  }
  
  public getBigAmount(networkID: number, provider: StaticJsonRpcProvider): Promise<number> {
    return new Promise<number>(reserve => reserve(0));
  }
  
  public async getTreasuryBalance(networkID: number, provider: StaticJsonRpcProvider): Promise<number> {
    const addresses: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
    const bondTokenAddress: string = getToken(this.id, 'address');
    const tokenContract: Contract = new Contract(bondTokenAddress, TokenContract, provider);
    const tokenBalanceOf = await tokenContract.balanceOf(addresses.TREASURY_ADDRESS);
    const bigNativeCurrencyLPToken = network.getNetworkBigNativeCurrencyLPToken;
    const nativeCurrencyInUSDC: number = await getNativeCurrencyInUSDC(networkID, provider);
    let treasuryBalance: number = 0;
    
    if (this.id === 'USDC') {
      treasuryBalance = tokenBalanceOf / Math.pow(10, 6);
    } else if (this.isWrap) {
      treasuryBalance = (tokenBalanceOf / Math.pow(10, 18)) * nativeCurrencyInUSDC;
    } else if (this.isLP) {
      const lpContractAddress: string = bigNativeCurrencyLPToken?.address || 'unknown';
      const lpContract = new Contract(lpContractAddress, LPTokenContract, provider);
      const lpBalanceOf = await lpContract.balanceOf(addresses.TREASURY_ADDRESS);
      const tokens: IBlockchain.IToken[] = network.getCurrentNetworkTokens || [];
      const wrapTokenAddress: string | undefined = tokens
        .find(({ isWrap }: IBlockchain.IToken) => isWrap)?.address;
      const totalSupply: number = (await lpContract.totalSupply());
      
      let lpPriceInUSDC;
      
      if (wrapTokenAddress) {
        const { reserves: [reserve0, reserve1], comparedAddressInReserve } = await getReserves({
          contractAddress: lpContractAddress,
          contractABI: LPTokenContract,
          provider,
          comparedAddress: wrapTokenAddress,
        });
        
        if (comparedAddressInReserve === 0) {
          lpPriceInUSDC = ((((reserve0 / Math.pow(10, 18)) * 2) * nativeCurrencyInUSDC) / (totalSupply / Math.pow(10, 18)));
        } else if (comparedAddressInReserve === 1) {
          lpPriceInUSDC = ((((reserve1 / Math.pow(10, 18)) * 2) * nativeCurrencyInUSDC) / (totalSupply / Math.pow(10, 18)));
        } else {
          throw new Error('No existed wrapTokenAddress in reserves');
        }
      } else {
        throw new Error('wrapTokenAddress Error');
      }
      treasuryBalance = (lpBalanceOf / Math.pow(10, 18)) * lpPriceInUSDC;
    } else if (this.id === 'CRV') {
      treasuryBalance = await getCrvTreasuryBalance(networkID, provider, this.id);
    } else {
      const tokenInNativeCurrency: number = await getTokenInNativeCurrency(this.id, networkID, provider);
      const tokenPriceInUSDC: number = tokenInNativeCurrency * nativeCurrencyInUSDC;
      treasuryBalance = tokenBalanceOf / Math.pow(10, 18) * tokenPriceInUSDC
    }

    await sleep(0.01);
    
    return treasuryBalance;
  }
  
  protected getTokenPrice(): number {
    return getTokenPrice(this.bondToken);
  }
  
  get getReserveAddress(): string {
    return getToken(this.bondToken, 'address');
  }
}
