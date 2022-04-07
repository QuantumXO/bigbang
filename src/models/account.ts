import { IBlockchain } from '@models/blockchain';
import { JsonRpcProvider, StaticJsonRpcProvider } from '@ethersproject/providers';
import { Bond } from '@services/helpers/bond/bond';

export namespace IAccount {
  export interface IGetBalances {
    address: string;
    networkID: IBlockchain.NetworksEnum;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
  }
  export interface IAccountBalances {
    balances: {
      bang: string;
      big: string;
      dYel: string;
    };
  }
  export interface ILoadAccountDetails {
    address: string;
    networkID: IBlockchain.NetworksEnum;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
  }
  export interface IUserAccountDetails {
    balances: {
      bang: string;
      big: string;
      dYel: string;
    };
    staking: {
      big: number;
      bang: number;
    };
    wrapping: {
      bang: number;
    };
  }
  export interface ICalcUserBondDetails {
    address: string;
    bond: Bond;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: IBlockchain.NetworksEnum;
  }
  export interface IUserBondDetails {
    allowance: number;
    balance: number;
    nativeCurrencyBalance: number;
    interestDue: number;
    bondMaturationBlock: number;
    pendingPayout: number; //Payout formatted in gwei.
  }
  export interface ICalcUserTokenDetailsArgs {
    address: string;
    token: IBlockchain.IToken;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: IBlockchain.NetworksEnum;
  }
  export interface IUserTokenDetails {
    allowance: number;
    balance: number;
    isNativeCurrency?: boolean;
  }
  export interface IAccountSlice {
    bonds: { [key: string]: IUserBondDetails };
    balances: {
      bang: string;
      big: string;
      dYel: string;
    };
    loading: boolean;
    staking: {
      big: number;
      bang: number;
    };
    wrapping: {
      bang: number;
    };
    tokens: { [key: string]: IUserTokenDetails };
  }
}