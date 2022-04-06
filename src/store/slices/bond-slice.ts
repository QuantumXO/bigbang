import { BigNumber, constants, ethers, Contract } from 'ethers';
import { getMarketPrice, getTokenPrice, sleep } from '@services/helpers';
import { calculateUserBondDetails, fetchAccountSuccess, getBalances } from './account-slice';
import { getBondAddresses } from '../../constants';
import { clearPendingTxn, fetchPendingTxns } from './pending-txns-slice';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { JsonRpcProvider, StaticJsonRpcProvider } from '@ethersproject/providers';
import { Bond } from '@services/helpers/bond/bond';
import { IBlockchain } from '@models//blockchain';
import { getBondCalculator } from '@services/helpers/bond-calculator';
import { RootState } from '../store';
import { error, info, success, warning } from '../slices/messages-slice';
import { messages } from '@constants/messages';
import { getGasPrice } from '@services/helpers/get-gas-price';
import { metamaskErrorWrap } from '@services/helpers/metamask-error-wrap';

interface IChangeApproval {
  bond: Bond;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  networkID: IBlockchain.NetworksEnum;
  address: string;
}

export const changeApproval = createAsyncThunk(
  'bonding/changeApproval',
  async ({ bond, provider, networkID, address }: IChangeApproval,
  { dispatch }) => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    
    const signer = provider.getSigner();
    const reserveContract = bond.getContractForReserve(networkID, signer);
    
    let approveTx;
    try {
      const gasPrice = await getGasPrice(provider);
      const bondAddr = bond.getAddressForBond(networkID);
      approveTx = await reserveContract.approve(bondAddr, constants.MaxUint256, { gasPrice });
      dispatch(
        fetchPendingTxns({
          txnHash: approveTx.hash,
          text: 'Approving ' + bond.displayName,
          type: 'approve_' + bond.name
        })
      );
      await approveTx.wait();
      dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
      metamaskErrorWrap(err, dispatch);
    } finally {
      if (approveTx) {
        dispatch(clearPendingTxn(approveTx.hash));
      }
    }
    
    await sleep(2);
    
    const allowance: any = await reserveContract.allowance(address, bond.getAddressForBond(networkID));
    
    return dispatch(
      fetchAccountSuccess({
        bonds: {
          [bond.name]: {
            allowance: Number(allowance)
          }
        }
      })
    );
  }
);

interface ICalcBondDetails {
  bond: Bond;
  value: string | null;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  networkID: IBlockchain.NetworksEnum;
}

export interface IBondDetails {
  bond: string;
  bondDiscount: number;
  bondQuote: number;
  purchased: number;
  vestingTerm: number;
  maxBondPrice: number;
  bondPrice: number;
  marketPrice: number;
  maxBondPriceToken: number;
}

export const calcBondDetails = createAsyncThunk(
  'bonding/calcBondDetails',
  async ({ bond, value, provider, networkID }: ICalcBondDetails,
  { dispatch }) => {
    if (!value) {
      value = '0';
    }
    
    const amountInWei: BigNumber = ethers.utils.parseEther(value);
    
    let bondPrice: number = 0,
        bondDiscount: number = 0,
        valuation: number = 0,
        bondQuote: number = 0;
    
    const addresses: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
    
    const bondContract = bond.getContractForBond(networkID, provider);
    const bondCalcContract = getBondCalculator(networkID, provider);
    
    const terms = await bondContract.terms();
    const maxBondPrice = (await bondContract.maxPayout()) / Math.pow(10, 9);
    
    let marketPrice = await getMarketPrice(networkID, provider);
    
    const stableTokenPrice: number = getTokenPrice('USDC');
    marketPrice = (marketPrice / Math.pow(10, 9)) * stableTokenPrice;
    
    try {
      bondPrice = await bondContract.bondPriceInUSD();
      
      /*if (bond.name === avaxTime.name) {
        const avaxPrice = getTokenPrice('AVAX');
        bondPrice = bondPrice * avaxPrice;
      }*/
      
      bondDiscount = (marketPrice * Math.pow(10, 18) - bondPrice) / bondPrice;
    } catch (e) {
      console.log('error getting bondPriceInUSD', e);
    }
    
    let maxBondPriceToken = 0;
    const maxBodValue = ethers.utils.parseEther('1');
    
    if (bond.isLP) {
      valuation = await bondCalcContract.valuation(bond.getAddressForReserve(networkID), amountInWei);
      bondQuote = await bondContract.payoutFor(valuation);
      bondQuote = bondQuote / Math.pow(10, 9);
      
      const maxValuation = await bondCalcContract.valuation(bond.getAddressForReserve(networkID), maxBodValue);
      const maxBondQuote = await bondContract.payoutFor(maxValuation);
      maxBondPriceToken = maxBondPrice / (maxBondQuote * Math.pow(10, -9));
    } else {
      bondQuote = await bondContract.payoutFor(amountInWei);
      bondQuote = bondQuote / Math.pow(10, 18);
      
      const maxBondQuote = await bondContract.payoutFor(maxBodValue);
      maxBondPriceToken = maxBondPrice / (maxBondQuote * Math.pow(10, -18));
    }
    
    if (!!value && bondQuote > maxBondPrice) {
      dispatch(error({ text: messages.try_mint_more(maxBondPrice.toFixed(2).toString()) }));
    }
    
    // Calculate bonds purchased
    const token = bond.getContractForReserve(networkID, provider);
    let purchased = await token.balanceOf(addresses.TREASURY_ADDRESS);
    
    if (bond.isLP) {
      const assetAddress = bond.getAddressForReserve(networkID);
      const markdown = await bondCalcContract.markdown(assetAddress);
      
      purchased = await bondCalcContract.valuation(assetAddress, purchased);
      purchased = (markdown / Math.pow(10, 18)) * (purchased / Math.pow(10, 9));
    } else {
      if (bond.tokensInStrategy) {
        purchased = BigNumber.from(purchased).add(BigNumber.from(bond.tokensInStrategy)).toString();
      }
      purchased = purchased / Math.pow(10, 18);
      
      /* if (bond.name === wavax.name) {
        const avaxPrice = getTokenPrice('AVAX');
        purchased = purchased * avaxPrice;
      } */
    }
    
    return {
      bond: bond.name,
      bondDiscount,
      bondQuote,
      purchased,
      vestingTerm: Number(terms.vestingTerm),
      maxBondPrice,
      bondPrice: bondPrice / Math.pow(10, 18),
      marketPrice,
      maxBondPriceToken
    };
  }
);

interface IBondAsset {
  value: string;
  address: string;
  bond: Bond;
  networkID: IBlockchain.NetworksEnum;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  slippage: number;
  useAvax: boolean;
}

export const bondAsset = createAsyncThunk(
  'bonding/bondAsset',
  async (
    { value, address, bond, networkID, provider, slippage, useAvax }: IBondAsset,
    { dispatch }
  ) => {
    const depositorAddress = address;
    const acceptedSlippage = slippage / 100 || 0.005;
    const valueInWei = ethers.utils.parseUnits(value, 'ether');
    const signer = provider.getSigner();
    const bondContract = bond.getContractForBond(networkID, signer);
    
    const calculatePremium = await bondContract.bondPrice();
    const maxPremium = Math.round(calculatePremium * (1 + acceptedSlippage));
    
    let bondTx;
    try {
      const gasPrice = await getGasPrice(provider);
      
      if (useAvax) {
        bondTx = await bondContract.deposit(valueInWei, maxPremium, depositorAddress, { value: valueInWei, gasPrice });
      } else {
        bondTx = await bondContract.deposit(valueInWei, maxPremium, depositorAddress, { gasPrice });
      }
      dispatch(
        fetchPendingTxns({
          txnHash: bondTx.hash,
          text: 'Bonding ' + bond.displayName,
          type: 'bond_' + bond.name
        })
      );
      await bondTx.wait();
      dispatch(success({ text: messages.tx_successfully_send }));
      dispatch(info({ text: messages.your_balance_update_soon }));
      await sleep(10);
      await dispatch(calculateUserBondDetails({ address, bond, networkID, provider }));
      dispatch(info({ text: messages.your_balance_updated }));
      return;
    } catch (err: any) {
      return metamaskErrorWrap(err, dispatch);
    } finally {
      if (bondTx) {
        dispatch(clearPendingTxn(bondTx.hash));
      }
    }
  }
);

interface IRedeemBond {
  address: string;
  bond: Bond;
  networkID: IBlockchain.NetworksEnum;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  autostake: boolean;
}

export const redeemBond = createAsyncThunk(
  'bonding/redeemBond',
  async ({ address, bond, networkID, provider, autostake }: IRedeemBond,
  { dispatch }) => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    
    const signer = provider.getSigner();
    const bondContract = bond.getContractForBond(networkID, signer);
    
    let redeemTx;
    try {
      const gasPrice = await getGasPrice(provider);
      
      redeemTx = await bondContract.redeem(address, autostake, { gasPrice });
      const pendingTxnType = 'redeem_bond_' + bond.name + (autostake ? '_autostake' : '');
      dispatch(
        fetchPendingTxns({
          txnHash: redeemTx.hash,
          text: 'Redeeming ' + bond.displayName,
          type: pendingTxnType
        })
      );
      await redeemTx.wait();
      dispatch(success({ text: messages.tx_successfully_send }));
      await sleep(0.01);
      dispatch(info({ text: messages.your_balance_update_soon }));
      await sleep(10);
      await dispatch(calculateUserBondDetails({ address, bond, networkID, provider }));
      await dispatch(getBalances({ address, networkID, provider }));
      dispatch(info({ text: messages.your_balance_updated }));
      return;
    } catch (err: any) {
      metamaskErrorWrap(err, dispatch);
    } finally {
      if (redeemTx) {
        dispatch(clearPendingTxn(redeemTx.hash));
      }
    }
  }
);

export interface IBondSlice {
  loading: boolean;
  [key: string]: any;
}

const initialState: IBondSlice = {
  loading: true
};

const setBondState = (state: IBondSlice, payload: any) => {
  const bond = payload.bond;
  const newState = { ...state[bond], ...payload };
  state[bond] = newState;
  state.loading = false;
};

const bondingSlice = createSlice({
  name: 'bonding',
  initialState,
  reducers: {
    fetchBondSuccess(state, action) {
      state[action.payload.bond] = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(calcBondDetails.pending, state => {
      state.loading = true;
    })
    .addCase(calcBondDetails.fulfilled, (state, action) => {
      setBondState(state, action.payload);
      state.loading = false;
    })
    .addCase(calcBondDetails.rejected, (state, { error }) => {
      state.loading = false;
      console.log('calcBondDetails: ', error);
    });
  }
});

export default bondingSlice.reducer;

export const { fetchBondSuccess } = bondingSlice.actions;

const baseInfo = (state: RootState) => state.bonding;

export const getBondingState = createSelector(baseInfo, bonding => bonding);
