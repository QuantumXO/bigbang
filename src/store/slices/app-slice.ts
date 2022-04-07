import { ethers, Contract } from "ethers";
import { getBondAddresses } from "@constants/index";
import { BangTokenContract, StakingContract, BigTokenContract } from "@services/abi";
import { getMarketPrice, getTokenPrice, setAll } from "@services/helpers";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { JsonRpcProvider } from "@ethersproject/providers";
import { RootState } from "@store/store";
import allBonds from "@services/helpers/bond";
import { BigNumberish } from '@ethersproject/bignumber';
import { StableBond } from '@services/helpers/bond/stable-bond';
import { LPBond } from '@services/helpers/bond/lp-bond';
import { IBlockchain } from '@models/blockchain';

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
    const stableTokenPrice: number = getTokenPrice("USDC");
    
    const addresses: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
    
    const stakingContract: Contract = new Contract(addresses.STAKING_ADDRESS, StakingContract, provider);
    const currentBlock = await provider.getBlockNumber();
    const currentBlockTime = (await provider.getBlock(currentBlock)).timestamp;
    const bangContract: Contract = new Contract(addresses.BANG_ADDRESS, BangTokenContract, provider);
    const bigContract: Contract = new Contract(addresses.BIG_ADDRESS, BigTokenContract, provider);
    const marketPrice: number = ((await getMarketPrice(networkID, provider)) / Math.pow(10, 9)) * stableTokenPrice;
    const totalSupply = (await bigContract.totalSupply()) / Math.pow(10, 9);
    const circSupply = (await bangContract.circulatingSupply()) / Math.pow(10, 9);
    const stakingTVL: number = circSupply * marketPrice;
    const marketCap: number = totalSupply * marketPrice;
    
    const tokenBalPromises:Promise<number>[] = allBonds
      .map((bond: StableBond | LPBond) => bond.getTreasuryBalance(networkID, provider));
    const tokenBalances: number[] = await Promise.all(tokenBalPromises);
  
    console.log(tokenBalances);
    
    const treasuryBalance: number = tokenBalances
      .reduce((tokenBalance0: number, tokenBalance1: number) => tokenBalance0 + tokenBalance1, 0);
    
    const tokenAmountsPromises = allBonds.map((bond: StableBond | LPBond) => bond.getTokenAmount(networkID, provider));
    const tokenAmounts: number[] = await Promise.all(tokenAmountsPromises);
    const rfvTreasury = tokenAmounts
      .reduce((tokenAmount0: number, tokenAmount1: number) => tokenAmount0 + tokenAmount1, 0);
    
    const timeBondsAmountsPromises = allBonds.map((bond: StableBond | LPBond) => bond.getBigAmount(networkID, provider));
    const timeBondsAmounts: number[] = await Promise.all(timeBondsAmountsPromises);
    const timeAmount: number = timeBondsAmounts
      .reduce((timeAmount0: number, timeAmount1: number) => timeAmount0 + timeAmount1, 0);
    const timeSupply = totalSupply - timeAmount;
    
    const rfv: number = rfvTreasury / timeSupply;
    
    const epoch = await stakingContract.epoch();
    const stakingReward = epoch.distribute;
    const circ = await bangContract.circulatingSupply();
    const stakingRebase: number = stakingReward / circ;
    const fiveDayRate: number = Math.pow(1 + stakingRebase, 5 * 3) - 1;
    const stakingAPY: number = Math.pow(1 + stakingRebase, 365 * 3) - 1;
    const currentIndex: BigNumberish = await stakingContract.index();
    const nextRebase = epoch.endTime;
    
    const treasuryRunway: number = rfvTreasury / circSupply;
    const runway: number = Math.log(treasuryRunway) / Math.log(1 + stakingRebase) / 3;
    
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
