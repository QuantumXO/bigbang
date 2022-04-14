import { BigNumber, Contract, ethers } from 'ethers';
import { BangTokenContract, BigTokenContract, dYelTokenContract, TokenContract, StableBondContract, wFTMReserveContract } from '@services/abi';
import { setAll, getBondAddresses } from '@services/helpers';
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { IBlockchain } from "@models/blockchain";
import { RootState } from "../store";
import { BigNumberish } from '@ethersproject/bignumber';
import { IAccount } from '@models/account';

export const getBalances = createAsyncThunk(
  "account/getBalances",
  async ({ address, networkID, provider }: IAccount.IGetBalances): Promise<IAccount.IAccountBalances> => {
    const addresses: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
    const bigContract: Contract = new ethers.Contract(addresses.BIG_ADDRESS, BigTokenContract, provider);
    const bigBalance: BigNumberish = await bigContract.balanceOf(address);
    const bangContract: Contract = new ethers.Contract(addresses.BANG_ADDRESS, BangTokenContract, provider);
    const bangBalance: BigNumberish = await bangContract.balanceOf(address);
    const dYelContract: Contract = new ethers.Contract(addresses.DYEL_ADDRESS, dYelTokenContract, provider);
    const dYelBalance: BigNumberish = await dYelContract.balanceOf(address);
    
    return {
      balances: {
        big: ethers.utils.formatUnits(bigBalance, "gwei"),
        bang: ethers.utils.formatUnits(bangBalance, "gwei"),
        dYel: ethers.utils.formatEther(dYelBalance)
      }
    };
});

export const loadAccountDetails = createAsyncThunk(
  "account/loadAccountDetails",
  async ({ networkID, provider, address }: IAccount.ILoadAccountDetails): Promise<IAccount.IUserAccountDetails> => {
    let bigBalance: number = 0;
    let bangBalance: number = 0;
    let dYelBalance: number = 0;
    
    let bangDYelAllowance: number = 0;
    let stakeAllowance: number = 0;
    let unstakeAllowance: number = 0;
  
    const addresses = getBondAddresses(networkID);
  
    if (addresses.BIG_ADDRESS) {
      const bigContract = new ethers.Contract(addresses.BIG_ADDRESS, BigTokenContract, provider);
      bigBalance = await bigContract.balanceOf(address);
      stakeAllowance = await bigContract.allowance(address, addresses.STAKING_HELPER_ADDRESS);
    }
    
    if (addresses.BANG_ADDRESS) {
      const bangContract = new ethers.Contract(addresses.BANG_ADDRESS, BangTokenContract, provider);
      bangBalance = await bangContract.balanceOf(address);
      unstakeAllowance = await bangContract.allowance(address, addresses.STAKING_ADDRESS);
      
      if (addresses.DYEL_ADDRESS) {
        bangDYelAllowance = await bangContract.allowance(address, addresses.DYEL_ADDRESS);
      }
    }
  
    if (addresses.DYEL_ADDRESS) {
      const dYelContract = new ethers.Contract(addresses.DYEL_ADDRESS, dYelTokenContract, provider);
      dYelBalance = await dYelContract.balanceOf(address);
    }
  
    return {
      balances: {
        bang: ethers.utils.formatUnits(bangBalance, "gwei"),
        big: ethers.utils.formatUnits(bigBalance, "gwei"),
        dYel: ethers.utils.formatEther(dYelBalance)
      },
      staking: {
        big: Number(stakeAllowance),
        bang: Number(unstakeAllowance)
      },
      wrapping: {
        bang: Number(bangDYelAllowance)
      }
    };
  }
);

export const calculateUserBondDetails = createAsyncThunk(
  "account/calculateUserBondDetails",
  async ({
    address,
    bond,
    networkID,
    provider
  }: IAccount.ICalcUserBondDetails) => {
    if (!address) {
      return new Promise<any>(resolve => {
        resolve({
          bond: "",
          displayName: "",
          bondIcon: "",
          isLP: false,
          allowance: 0,
          balance: 0,
          interestDue: 0,
          bondMaturationBlock: 0,
          pendingPayout: "",
          avaxBalance: 0
        });
      });
    } else {
      const bondContract: Contract = new ethers.Contract(bond.bondAddress, StableBondContract, provider);
      // #TODO check
      const reserveContract: Contract = new Contract(bond.getReserveAddress, wFTMReserveContract, provider);
      const bondDetails = await bondContract.bondInfo(address);
      const interestDue: number = bondDetails.payout / Math.pow(10, 9);
      const bondMaturationBlock: number = Number(bondDetails.vesting) + Number(bondDetails.lastTime);
      const pendingPayout: BigNumber = await bondContract.pendingPayoutFor(address);
      let balance: string | number = "0";
  
      const allowance: BigNumber = await reserveContract.allowance(address, bond.bondAddress);
      
      balance = await reserveContract.balanceOf(address);
      
      const balanceVal: string = ethers.utils.formatEther(balance);
      const nativeCurrencyBalance = await provider.getSigner().getBalance();
      const nativeCurrencyVal = ethers.utils.formatEther(nativeCurrencyBalance);
      const pendingPayoutVal = ethers.utils.formatUnits(pendingPayout, "gwei");
  
      // #TODO check
      balance = (bond.id !== 'USDC')
        ? Number(balanceVal)
        : Number(balanceVal) * Math.pow(10, 12);
      
      return {
        bond: bond.id,
        displayName: bond.displayName,
        bondIcon: bond.bondIcon,
        isLP: bond.isLP,
        allowance: Number(allowance),
        balance,
        nativeCurrencyBalance: Number(nativeCurrencyVal),
        interestDue,
        bondMaturationBlock,
        pendingPayout: Number(pendingPayoutVal)
      };
    }
  }
);

export const calculateUserTokenDetails = createAsyncThunk(
  'account/calculateUserTokenDetails',
  async ({
    address,
    token,
    networkID,
    provider
  }: IAccount.ICalcUserTokenDetailsArgs) => {
    if (!address) {
      return new Promise<any>((resolve) => {
        resolve({
          token: "",
          address: "",
          img: "",
          allowance: 0,
          balance: 0
        });
      });
    } else {
      if (token.isNativeCurrency) {
        const nativeCurrencyBalance: BigNumber = await provider.getSigner().getBalance();
        const nativeCurrencyVal: string = ethers.utils.formatEther(nativeCurrencyBalance);
    
        return {
          token: token.name,
          tokenIcon: token.icon,
          balance: Number(nativeCurrencyVal),
          isNativeCurrency: true
        };
      } else {
        if (token.address) {
          const addresses = getBondAddresses(networkID);
          const tokenContract: Contract = new Contract(token.address, TokenContract, provider);
          const balance = await tokenContract.balanceOf(address);
          // #TODO remove comment
          // const allowance = await tokenContract.allowance(address, addresses.ZAPIN_ADDRESS);
          const allowance = 1;
    
          const balanceVal: number = Number(balance) / Math.pow(10, token.decimals);
    
          return {
            token: token.name,
            address: token.address,
            icon: token.icon,
            allowance: Number(allowance),
            balance: Number(balanceVal)
          };
        } else {
          throw new Error('No exist token address');
        }
      }
    }
  }
);

const initialState: IAccount.IAccountSlice = {
  loading: true,
  bonds: {},
  balances: { bang: "", big: "", dYel: "" },
  staking: { big: 0, bang: 0 },
  wrapping: { bang: 0 },
  tokens: {}
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountSuccess(state, action) {
      setAll(state, action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAccountDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAccountDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAccountDetails.rejected, (state, { error }) => {
        state.loading = false;
      })
      .addCase(getBalances.pending, state => {
        state.loading = true;
      })
      .addCase(getBalances.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getBalances.rejected, (state, { error }) => {
        state.loading = false;
      })
      .addCase(calculateUserBondDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        calculateUserBondDetails.fulfilled,
      (state, action): void | undefined => {
          if (!action.payload) return;
          const bond = action.payload.bond;
          state.bonds[bond] = action.payload;
          state.loading = false;
        }
      )
      .addCase(calculateUserBondDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log('calculateUserBondDetails: ', error);
      })
      .addCase(calculateUserTokenDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(calculateUserTokenDetails.fulfilled, (state, action) => {
        if (!action.payload) return;
        const token = action.payload.token;
        state.tokens[token] = action.payload;
        state.loading = false;
      })
      .addCase(calculateUserTokenDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log('calculateUserTokenDetails: ', error);
      });
  }
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
