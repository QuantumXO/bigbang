import { ethers, Contract } from "ethers";
import { getBondAddresses } from "@constants/index";
import { BangTokenContract, StakingContract, BigTokenContract } from "@services/abi";
import { getMarketPrice, getTokenPrice, setAll } from "@services/helpers";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { JsonRpcProvider } from "@ethersproject/providers";
import { RootState } from "@store/store";
import allBonds from "@services/helpers/bond";
import { BigNumberish } from '@ethersproject/bignumber';

interface ILoadAppDetails {
  networkID: number;
  provider: JsonRpcProvider;
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
}

export const loadAppDetails = createAsyncThunk(
  'app/loadAppDetails',
  async ({ networkID, provider }: ILoadAppDetails): Promise<Omit<IAppSlice, 'loading' | 'networkID'>> => {
    console.group('app/loadAppDetails');
    
    const stableTokenPrice = getTokenPrice("USDC");
    
    console.log('stableTokenPrice: ', stableTokenPrice);
    
    const addresses = getBondAddresses(networkID);
  
    console.log('addresses: ', addresses);
    
    const stakingContract: Contract = new Contract(addresses.STAKING_ADDRESS, StakingContract, provider);
    const currentBlock = await provider.getBlockNumber();
    const currentBlockTime = (await provider.getBlock(currentBlock)).timestamp;
    const bangContract: Contract = new Contract(addresses.BANG_ADDRESS, BangTokenContract, provider);
    const bigContract: Contract = new Contract(addresses.BIG_ADDRESS, BigTokenContract, provider);
  
    const marketPrice = ((await getMarketPrice(networkID, provider)) / Math.pow(10, 9)) * stableTokenPrice;
    
    ///
    const a = await bigContract.totalSupply();
    const b = await bangContract.circulatingSupply();
    console.log('await bigContract.totalSupply(): ', a);
    console.log('bangContract.circulatingSupply(): ', b);
    ///
    
    const totalSupply = (await bigContract.totalSupply()) / Math.pow(10, 9);
    const circSupply = (await bangContract.circulatingSupply()) / Math.pow(10, 9);
  
    
    const stakingTVL = circSupply * marketPrice;
    const marketCap = totalSupply * marketPrice;
  
    console.log('stakingTVL: ', stakingTVL);
    console.log('marketCap: ', marketCap);
    
    const tokenBalPromises = allBonds.map(bond => bond.getTreasuryBalance(networkID, provider));
    const tokenBalances = await Promise.all(tokenBalPromises);
    const treasuryBalance = tokenBalances
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      .reduce((tokenBalance0, tokenBalance1) => tokenBalance0 + tokenBalance1, 0);
    
    const tokenAmountsPromises = allBonds.map(bond => bond.getTokenAmount(networkID, provider));
    const tokenAmounts = await Promise.all(tokenAmountsPromises);
    const rfvTreasury = tokenAmounts
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      .reduce((tokenAmount0, tokenAmount1) => tokenAmount0 + tokenAmount1, 0);
    
    const timeBondsAmountsPromises = allBonds.map(bond => bond.getTimeAmount(networkID, provider));
    const timeBondsAmounts = await Promise.all(timeBondsAmountsPromises);
    const timeAmount = timeBondsAmounts
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      .reduce((timeAmount0, timeAmount1) => timeAmount0 + timeAmount1, 0);
    const timeSupply = totalSupply - timeAmount;
    
    const rfv = rfvTreasury / timeSupply;
  
    console.log('rfv: ', rfv);
    
    const epoch = await stakingContract.epoch();
    const stakingReward = epoch.distribute;
    const circ = await bangContract.circulatingSupply();
    const stakingRebase = stakingReward / circ;
    const fiveDayRate = Math.pow(1 + stakingRebase, 5 * 3) - 1;
    const stakingAPY = Math.pow(1 + stakingRebase, 365 * 3) - 1;
    
    const currentIndex: BigNumberish = await stakingContract.index();
    const nextRebase = epoch.endTime;
    
    const treasuryRunway = rfvTreasury / circSupply;
    const runway = Math.log(treasuryRunway) / Math.log(1 + stakingRebase) / 3;
    
    console.groupEnd();
    
    return {
      currentIndex: String(Number(ethers.utils.formatUnits(currentIndex, "gwei")) / 4.5),
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
      runway
    };
  }
);

const initialState = {
  loading: true
};

const appSlice = createSlice({
  name: "app",
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
