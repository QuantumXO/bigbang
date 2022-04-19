import { ethers, Contract } from 'ethers';
import { BangTokenContract, StakingContract, BigTokenContract, dYelTokenContract } from '@services/abi';
import { getMarketPrice, setAll, getBondAddresses } from '@services/helpers';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { JsonRpcProvider } from '@ethersproject/providers';
import { RootState } from '@store/store';
import { BigNumberish } from '@ethersproject/bignumber';
import { IBlockchain } from '@models/blockchain';
import { Bond } from '@services/common/bond';
import { getTreasuryBalance, getTokenAmount } from '@services/common/network';

interface ILoadAppDetails {
  networkID: number;
  provider: JsonRpcProvider;
  bonds: Bond[];
  tokens: IBlockchain.IToken[];
}
export interface IAppSlice {
  loading: boolean;
  stakingTVL: number;
  marketPrice: number;
  marketCap: number;
  circSupply: number;
  currentIndex: string;
  currentBlock: number;
  currentBlockTime: number;
  fiveDayRate: number;
  treasuryBalance: number;
  stakingAPY: number;
  stakingRebase: number;
  networkID: number;
  nextRebase: number;
  totalSupply: number;
  rfv: number;
  runway: number;
  dYelPrice: number;
}

export const loadAppDetails = createAsyncThunk(
  'app/loadAppDetails',
  async ({ networkID, provider, bonds, tokens }: ILoadAppDetails): Promise<Omit<IAppSlice, 'loading' | 'networkID'> | undefined> => {
    try {
      const { STAKING_ADDRESS, BANG_ADDRESS, BIG_ADDRESS, DYEL_ADDRESS } = getBondAddresses(networkID);
      
      if (STAKING_ADDRESS && BANG_ADDRESS && BIG_ADDRESS && DYEL_ADDRESS) {
        const stakingContract: Contract = new Contract(STAKING_ADDRESS, StakingContract, provider);
        const currentBlock: number = await provider.getBlockNumber();
        const currentBlockTime: number = (await provider.getBlock(currentBlock))?.timestamp;
        const bangContract: Contract = new Contract(BANG_ADDRESS, BangTokenContract, provider);
        const bigContract: Contract = new Contract(BIG_ADDRESS, BigTokenContract, provider);
        const marketPrice: number = await getMarketPrice(networkID, provider, tokens);
        const totalSupply: number = (await bigContract.totalSupply()) / Math.pow(10, 9);
        const circSupply: number = (await bangContract.circulatingSupply()) / Math.pow(10, 9);
        const stakingTVL: number = circSupply * marketPrice;
        const marketCap: number = totalSupply * marketPrice;
  
        const tokenBalPromises: Promise<number>[] = bonds.map(async (bond: Bond): Promise<number> => {
          return getTreasuryBalance(bond, tokens, networkID, provider);
        });
  
        const tokenBalances: number[] = await Promise.all(tokenBalPromises);
  
        const treasuryBalance: number = tokenBalances
          .reduce((tokenBalance0: number, tokenBalance1: number): number => tokenBalance0 + tokenBalance1, 0);
  
        const dYelContract: Contract = new ethers.Contract(DYEL_ADDRESS, dYelTokenContract, provider);
        const dYelTotalSupply: number = await dYelContract.totalSupply() / Math.pow(10, 18);
        const dYelPrice: number = treasuryBalance / dYelTotalSupply;
  
        const tokenAmountsPromises = bonds.map((bond: Bond) => getTokenAmount(bond, tokens, networkID, provider));
        const tokenAmounts: number[] = await Promise.all(tokenAmountsPromises);
        const rfvTreasury = tokenAmounts
          .reduce((tokenAmount0: number, tokenAmount1: number) => tokenAmount0 + tokenAmount1, 0);
  
        const bigBondsAmountsPromises = bonds.map((bond: Bond) => bond.getBigAmount(networkID, provider));
        const bigBondsAmounts: number[] = await Promise.all(bigBondsAmountsPromises);
        const bigAmount: number = bigBondsAmounts
          .reduce((bigAmount0: number, bigAmount1: number) => bigAmount0 + bigAmount1, 0);
        const bigSupply = totalSupply - bigAmount;
  
        const rfv: number = rfvTreasury / bigSupply;
  
        const epoch = await stakingContract.epoch();
        const stakingReward = epoch.distribute;
        const circ = await bangContract.circulatingSupply();
  
        // #TODO check
        const stakingRebase: number = (stakingReward / circ) || 0; // NaN
        const fiveDayRate: number = Math.pow(1 + stakingRebase, 5 * 3) - 1;
        const stakingAPY: number = Math.pow(1 + stakingRebase, 365 * 3) - 1;
        const currentIndex: BigNumberish = await stakingContract.index();
        const nextRebase = epoch.endTime;
  
        const treasuryRunway: number = rfvTreasury / circSupply;
        const runway: number = Math.log(treasuryRunway) / Math.log(1 + stakingRebase) / 3;
  
        return {
          currentIndex: String(Number(ethers.utils.formatUnits(currentIndex, 'gwei')) / 4.5),
          totalSupply,
          marketCap,
          currentBlock,
          circSupply,
          fiveDayRate,
          treasuryBalance,
          stakingAPY,
          stakingTVL,
          stakingRebase,
          marketPrice,
          currentBlockTime,
          nextRebase,
          rfv,
          runway,
          dYelPrice
        };
      } else {
        console.log('loadAppDetails() addresses error');
      }
    } catch (e) {
      throw new Error('loadAppDetails() Error');
    }
  }
);

const initialState = {
  loading: true
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loadAppDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadAppDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAppDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log('loadAppDetails: ', error);
      });
  }
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
