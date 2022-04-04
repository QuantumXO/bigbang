import { Contract, ethers } from 'ethers';
import { getBondAddresses } from "@constants/index";
import { BangTokenContract, BigTokenContract, dYelTokenContract, TokenContract } from "@services/abi";
import { setAll } from '@services/helpers';

import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Bond } from '@services/helpers/bond/bond';
import { IBlockchain } from "@models/blockchain";
import { RootState } from "../store";
import { IToken } from '@services/helpers/tokens';

interface IGetBalances {
  address: string;
  networkID: IBlockchain.NetworksEnum;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
}
interface IAccountBalances {
  balances: {
    bang: string;
    big: string;
    dYel: string;
  };
}
interface ILoadAccountDetails {
  address: string;
  networkID: IBlockchain.NetworksEnum;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
}
interface IUserAccountDetails {
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
interface ICalcUserBondDetails {
  address: string;
  bond: Bond;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  networkID: IBlockchain.NetworksEnum;
}
export interface IUserBondDetails {
  allowance: number;
  balance: number;
  avaxBalance: number;
  interestDue: number;
  bondMaturationBlock: number;
  pendingPayout: number; //Payout formatted in gwei.
}
interface ICalcUserTokenDetails {
  address: string;
  token: IToken;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  networkID: IBlockchain.NetworksEnum;
}
export interface IUserTokenDetails {
  allowance: number;
  balance: number;
  isAvax?: boolean;
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

export const getBalances = createAsyncThunk(
  "account/getBalances",
  async ({ address, networkID, provider }: IGetBalances): Promise<IAccountBalances> => {
    const addresses: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
    
    const bigContract: Contract = new ethers.Contract(addresses.BIG_ADDRESS, BigTokenContract, provider);
    const bigBalance: any = await bigContract.balanceOf(address);
    const bangContract: Contract = new ethers.Contract(addresses.BANG_ADDRESS, BangTokenContract, provider);
    const bangBalance: any = await bangContract.balanceOf(address);
    const dYelContract: Contract = new ethers.Contract(addresses.DYEL_ADDRESS, dYelTokenContract, provider);
    const dYelBalance: any = await dYelContract.balanceOf(address);
    
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
  async ({ networkID, provider, address }: ILoadAccountDetails): Promise<IUserAccountDetails> => {
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
  }: ICalcUserBondDetails) => {
    if (!address) {
      return new Promise<any>(resolve => {
        resolve({
          bond: "",
          displayName: "",
          bondIconSvg: "",
          isLP: false,
          allowance: 0,
          balance: 0,
          interestDue: 0,
          bondMaturationBlock: 0,
          pendingPayout: "",
          avaxBalance: 0
        });
      });
    }
    
    const bondContract: Contract = bond.getContractForBond(networkID, provider);
    const reserveContract: Contract = bond.getContractForReserve(networkID, provider);
    
    const bondDetails = await bondContract.bondInfo(address);
    const interestDue = bondDetails.payout / Math.pow(10, 9);
    const bondMaturationBlock = Number(bondDetails.vesting) + Number(bondDetails.lastTime);
    const pendingPayout = await bondContract.pendingPayoutFor(address);
    
    let balance = "0";
    
    const allowance = await reserveContract.allowance(address, bond.getAddressForBond(networkID));
    balance = await reserveContract.balanceOf(address);
    const balanceVal = ethers.utils.formatEther(balance);
    
    const avaxBalance = await provider.getSigner().getBalance();
    const avaxVal = ethers.utils.formatEther(avaxBalance);
    
    const pendingPayoutVal = ethers.utils.formatUnits(pendingPayout, "gwei");
  
    return {
      bond: bond.name,
      displayName: bond.displayName,
      bondIconSvg: bond.bondIconSvg,
      isLP: bond.isLP,
      allowance: Number(allowance),
      balance: Number(balanceVal),
      avaxBalance: Number(avaxVal),
      interestDue,
      bondMaturationBlock,
      pendingPayout: Number(pendingPayoutVal)
    };
  }
);

export const calculateUserTokenDetails = createAsyncThunk(
  "account/calculateUserTokenDetails",
  async ({
    address,
    token,
    networkID,
    provider
  }: ICalcUserTokenDetails) => {
    if (!address) {
      return new Promise<any>(resevle => {
        resevle({
          token: "",
          address: "",
          img: "",
          allowance: 0,
          balance: 0
        });
      });
    }
  
    if (token.isAvax) {
      const avaxBalance = await provider.getSigner().getBalance();
      const avaxVal = ethers.utils.formatEther(avaxBalance);
      
      return {
        token: token.name,
        tokenIcon: token.img,
        balance: Number(avaxVal),
        isAvax: true
      };
    }
  
    const addresses = getBondAddresses(networkID);
    
    const tokenContract = new ethers.Contract(token.address, TokenContract, provider);
    
    let balance = "0";
    
    const allowance = await tokenContract.allowance(address, addresses.ZAPIN_ADDRESS);
    balance = await tokenContract.balanceOf(address);
    
    const balanceVal = Number(balance) / Math.pow(10, token.decimals);
    
    return {
      token: token.name,
      address: token.address,
      img: token.img,
      allowance: Number(allowance),
      balance: Number(balanceVal)
    };
  }
);

const initialState: IAccountSlice = {
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
  extraReducers: builder => {
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
      });
  }
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
