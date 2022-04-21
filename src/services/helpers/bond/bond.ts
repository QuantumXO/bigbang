import { IBlockchain } from '@models/blockchain';
import { ContractInterface } from 'ethers';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { IBond } from '@models/bond';
import { getToken } from '@services/helpers/get-token';
import { StableBondContract, StableReserveContract } from '@services/abi';

export interface BondOpts {
  readonly id: IBond.IBondType; // Internal name used for references
  readonly bondIcon: string; //  SVG path for icons
  readonly bondAddress: string;
  readonly isLP?: boolean;
  readonly lpUrl?: string;
  readonly isWrap?: boolean;
  readonly bondLPIcon?: string;
  readonly tokensInStrategy?: string;
  readonly displayName?: string; // Display name on UI
  readonly networkType?: IBlockchain.NetworkType;
  readonly reserveContractAbi?: ContractInterface;
  readonly bondContractABI?: ContractInterface; // ABI for contract
  readonly bondToken?: IBlockchain.TokenType; // Unused, but native token to buy the bond.
}

export class Bond {
  public readonly id: IBond.IBondType;
  public readonly bondIcon: string;
  public readonly bondContractABI: ContractInterface; // Bond ABI
  public readonly bondToken: IBlockchain.TokenType;
  public readonly bondAddress: string;
  public readonly reserveContractAbi: ContractInterface;
  public readonly displayUnits: string;
  public readonly displayName: string; // Display name on UI
  public readonly isWrap?: boolean;
  public readonly isLP?: boolean;
  public readonly lpUrl?: string;
  public readonly bondLPIcon?: string;
  public readonly tokensInStrategy?: string;
  public readonly networkType?: IBlockchain.NetworkType;

  constructor(bondOpts: BondOpts) {
    const {
      id, displayName, bondIcon, bondContractABI, bondToken, lpUrl, tokensInStrategy, isLP, isWrap,
      bondAddress, reserveContractAbi, networkType, bondLPIcon
    } = bondOpts;
    this.id = id;
    this.displayName = displayName || id;
    this.bondIcon = bondIcon;
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
    this.bondLPIcon = bondLPIcon;
  }
  
  public getBigAmount(networkID: number, provider: StaticJsonRpcProvider): Promise<number> {
    return new Promise<number>(reserve => reserve(0));
  }
  
  /* protected getTokenPrice(): number {
    return getTokenPrice(this.bondToken);
  } */
  
  getReserveAddress(tokens: IBlockchain.IToken[]): string {
    return getToken(tokens, this.bondToken, 'address');
  }
}
