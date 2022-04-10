import { IBlockchain } from '@models/blockchain';
import { ContractInterface } from 'ethers';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { getTokenPrice } from '@services/helpers/token-price';
import { IBond } from '@models/bond';
import { getToken } from '@services/helpers/get-token';

export interface BondOpts {
  readonly id: IBond.IBondType; // Internal name used for references
  readonly displayName: string; // Displayname on UI
  readonly bondIconSvg: string; //  SVG path for icons
  readonly bondContractABI: ContractInterface; // ABI for contract
  // readonly networkAddresses: IBlockchain.INetworkAddresses; // Mapping of network --> Addresses
  readonly bondToken: IBlockchain.WTF_TokenType; // Unused, but native token to buy the bond.
  readonly isWrap?: boolean;
  readonly isLP?: boolean;
  readonly bondAddress: string;
}

export abstract class Bond {
  public readonly id: IBond.IBondType;
  public readonly displayName: string;
  public readonly type: IBlockchain.WTF_BondEnum;
  public readonly bondIconSvg: string;
  public readonly bondContractABI: ContractInterface; // Bond ABI
  // public readonly networkAddresses: IBlockchain.INetworkAddresses;
  public readonly bondToken: IBlockchain.WTF_TokenType;
  public readonly lpUrl?: string;
  public readonly tokensInStrategy?: string;
  public readonly isWrap?: boolean;
  public readonly bondAddress: string;
  
  // The following two fields will differ on how they are set depending on bond type
  public abstract isLP: boolean;
  protected abstract reserveContractAbi: ContractInterface; // Token ABI
  public abstract displayUnits: string;
  
  // Async method that returns a Promise
  public abstract getTreasuryBalance(
    networkID: IBlockchain.NetworksEnum,
    provider: StaticJsonRpcProvider
  ): Promise<number>;
  
  public abstract getTokenAmount(networkID: IBlockchain.NetworksEnum, provider: StaticJsonRpcProvider): Promise<number>;
  
  public abstract getBigAmount(networkID: IBlockchain.NetworksEnum, provider: StaticJsonRpcProvider): Promise<number>;
  
  constructor(type: IBlockchain.WTF_BondEnum, bondOpts: BondOpts) {
    this.id = bondOpts.id;
    this.displayName = bondOpts.displayName;
    this.type = type;
    this.bondIconSvg = bondOpts.bondIconSvg;
    this.bondContractABI = bondOpts.bondContractABI;
    // this.networkAddresses = bondOpts.networkAddresses;
    this.bondToken = bondOpts.bondToken;
    this.isWrap = bondOpts.isWrap;
    this.bondAddress = bondOpts.bondAddress;
  }
  
  /* public getAddressForBond(networkID: IBlockchain.NetworksEnum): string {
    return this.networkAddresses[networkID]?.bondAddress;
  } */
  
  /* public getReserveAddressForBond(networkID: IBlockchain.NetworksEnum): string {
    return this.networkAddresses[networkID]?.reserveAddress;
  } */
  
  /* public getContractForBond(
    networkID: number,
    provider: StaticJsonRpcProvider | JsonRpcSigner
  ): Contract {
    const bondAddress = this.getAddressForBond(networkID);
    return new Contract(bondAddress, this.bondContractABI, provider);
  } */
  
  /* public getAddressForReserve(networkID: number): string {
    return this.networkAddresses[networkID].reserveAddress;
  } */
  
  /* public getContractForReserve(
    networkID: IBlockchain.NetworksEnum,
    provider: StaticJsonRpcProvider | JsonRpcSigner
  ): Contract {
    const reserveAddress = this.getAddressForReserve(networkID);
    return new Contract(reserveAddress, this.reserveContractAbi, provider);
  } */
  
  protected getTokenPrice(): number {
    return getTokenPrice(this.bondToken);
  }
  
  get getReserveAddress(): string {
    return getToken(this.bondToken, 'address');
  }
}
