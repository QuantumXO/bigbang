import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAccount } from '@models/account';
import { IBlockchain } from '@models/blockchain';
import { getBondAddresses, setAll } from '@services/helpers';
import { loadAppDetails } from '@store/slices/app-slice';
import { Bond } from '@services/common/bond';
import { DEFAULT_NETWORK } from '@constants/networks';

interface INetworkSlice {
  bonds: Bond[];
  tokens: IBlockchain.IToken[];
  chainID: string;
}

const { chainId: DEFAULT_CHAIN_ID, rpcUrls: DEFAULT_RPC_URLS = [] } = DEFAULT_NETWORK;

const initialState: INetworkSlice = {
  bonds: [],
  tokens: [],
  chainID: DEFAULT_CHAIN_ID,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    onInit(state, action) {
      setAll(state, action.payload);
    },
  }
});


export const { onInit } = networkSlice.actions;

export default networkSlice.reducer;