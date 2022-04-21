import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { IBlockchain } from '@models/blockchain';
import { setAll } from '@services/helpers';
import { Bond } from '@services/helpers/bond/bond';
import { DEFAULT_NETWORK } from '@constants/networks';
import { getCurrentNetwork, onMapCurrentNetworkTokens } from '@services/common/network';
import allBonds from '@constants/bonds';

export interface INetworkState {
  bonds: Bond[];
  tokens: IBlockchain.IToken[];
  chainId: string;
}

const { chainId: DEFAULT_CHAIN_ID } = DEFAULT_NETWORK;

const initialState: INetworkState = {
  bonds: [],
  tokens: [],
  chainId: DEFAULT_CHAIN_ID,
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    onSetChainID: (state: Draft<INetworkState>, action: PayloadAction<{ chainId: string }>) => {
      setAll(state, action.payload);
    },
    onSetBonds(state: Draft<INetworkState>): void {
      const { chainId } = state;
      const currentNetwork = getCurrentNetwork(chainId) as IBlockchain.INetwork;
  
      const bonds: Bond[] = allBonds.filter(({ networkType }: Bond) => currentNetwork?.id === networkType);
      
      setAll(state, { bonds });
    },
    onSetTokens(state: Draft<INetworkState>, action: PayloadAction): void {
      const { chainId, bonds } = state;
      const currentNetwork = getCurrentNetwork(chainId) as IBlockchain.INetwork;
  
      const tokens: IBlockchain.IToken[] = onMapCurrentNetworkTokens(currentNetwork, bonds);
      
      setAll(state, { tokens });
    },
  }
});


export const { onSetBonds, onSetChainID, onSetTokens } = networkSlice.actions;

export default networkSlice.reducer;