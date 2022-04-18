import { IPendingTxn } from './pending-txns-slice';
import { IAppSlice } from './app-slice';
import { IBondSlice } from './bond-slice';
import { IMessagesState } from './messages-slice';
import { IWrapSlice } from './wrap-slice';
import { IAccount } from '@models/account';
import { INetworkState } from '@store/slices/network';

export interface IReduxState {
  pendingTransactions: IPendingTxn[];
  account:  IAccount.IAccountSlice;
  app: IAppSlice;
  bonding: IBondSlice;
  messages: IMessagesState;
  wrapping: IWrapSlice;
  network: INetworkState;
}