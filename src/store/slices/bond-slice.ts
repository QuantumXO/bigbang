import { BigNumber, constants, ethers, Contract } from 'ethers';
import { getMarketPrice, sleep, getBondAddresses, getNativeCurrencyInUSDC, getTokenInNativeCurrency } from '@services/helpers';
import { calculateUserBondDetails, fetchAccountSuccess, getBalances } from './account-slice';
import { clearPendingTxn, fetchPendingTxns } from './pending-txns-slice';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { JsonRpcProvider, StaticJsonRpcProvider } from '@ethersproject/providers';
import { Bond } from '@services/common/bond';
import { IBlockchain } from '@models/blockchain';
import { getBondCalculator } from '@services/helpers/bond/get-bond-calculator';
import { RootState } from '../store';
import { error, info, success, warning } from '../slices/messages-slice';
import { messages } from '@constants/messages';
import { getGasPrice } from '@services/helpers/get-gas-price';
import { metamaskErrorWrap } from '@services/helpers/metamask-error-wrap';
import { StableBondContract, wFTMReserveContract, LpReserveContract } from '@services/abi';
import { getToken } from '@services/helpers/get-token';
import { getBondPrice } from '@services/helpers/bond/get-bond-price';
import network from '@services/common/network';

interface IChangeApproval {
  bond: Bond;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  networkID: number;
  address: string;
}
interface ICalcBondDetails {
  bond: Bond;
  value: string | null;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  networkID: number;
}
interface IRedeemBond {
  address: string;
  bond: Bond;
  networkID: number;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  autostake: boolean;
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
  minPurchase: number;
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
    // const reserveContract: Contract = new Contract('0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', wFTMReserveContract, signer);
    const reserveContract: Contract = new Contract(bond.getReserveAddress, wFTMReserveContract, signer);
    
    let approveTx;
    try {
      const gasPrice: BigNumber = await getGasPrice(provider);
      approveTx = await reserveContract.approve(bond.bondAddress, constants.MaxUint256, { gasPrice });
      
      dispatch(
        fetchPendingTxns({
          txnHash: approveTx.hash,
          text: 'Approving ' + bond.displayName,
          type: 'approve_' + String(bond.id)
        })
      );
      await approveTx.wait();
      dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
      console.log('err: ', err);
      metamaskErrorWrap(err, dispatch);
    } finally {
      if (approveTx) {
        dispatch(clearPendingTxn(approveTx.hash));
      }
    }
    
    await sleep(2);
    
    // const allowance: any = await reserveContract.allowance(address, bond.getAddressForBond(networkID));
    const allowance: any = await reserveContract.allowance(address, bond.bondAddress);
    
    return dispatch(
      fetchAccountSuccess({
        bonds: {
          [bond.id]: {
            allowance: Number(allowance)
          }
        }
      })
    );
  }
);

export const calcBondDetails = createAsyncThunk(
  'bonding/calcBondDetails',
  async ({ bond, value, provider, networkID }: ICalcBondDetails,
  { dispatch }) => {
    if (!value) {
      value = '0';
    }
  
    const addresses: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
    const amountInWei: BigNumber = ethers.utils.parseEther(value);
    const bondCalcContract: Contract = getBondCalculator(networkID, provider);
    const bondContract: Contract = new Contract(bond.bondAddress, StableBondContract, provider);
    const terms = await bondContract.terms();
    const maxBondPrice: number = (await bondContract.maxPayout()) / Math.pow(10, 9);
    const marketPrice: number = await getMarketPrice(networkID, provider);
    const minPurchase: number = await bondContract.minPayout() / Math.pow(10, 9);
    const maxBodValue = ethers.utils.parseEther('1');
    const bondPrice: number = await getBondPrice({ bond, networkID, provider });
    const bondDiscount: number = (marketPrice - bondPrice) / marketPrice;

    let valuation: number = 0;
    let bondQuote: number = 0;
    let maxBondPriceToken = 0;

    if (bond.isLP) {
      const bigNativeCurrencyLPToken: IBlockchain.IToken | undefined = network().getNetworkBigNativeCurrencyLPToken;
      const bigNativeCurrencyLPTokenAddress: string = bigNativeCurrencyLPToken?.address || 'unknown';
      valuation = await bondCalcContract.valuation(bigNativeCurrencyLPTokenAddress, amountInWei);
      bondQuote = await bondContract.payoutFor(valuation);
      bondQuote = bondQuote / Math.pow(10, 9);
  
      const maxValuation = await bondCalcContract.valuation(bigNativeCurrencyLPTokenAddress, maxBodValue);
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
    const token: Contract = new ethers.Contract(bond.getReserveAddress, wFTMReserveContract, provider);
    const tokenDecimals: number = await token.decimals();

    let purchased = await token.balanceOf(addresses.TREASURY_ADDRESS);

    if (bond.isLP) {
      const assetAddress: string = '0x659BB25B9308bfA16F5ea8d452b9a2BbaE84F60F';
      const markdown = await bondCalcContract.markdown(assetAddress);
  
      purchased = await bondCalcContract.valuation(assetAddress, purchased);
      purchased = (markdown / Math.pow(10, 18)) * (purchased / Math.pow(10, 9));
    } else {
      if (bond.tokensInStrategy) {
        purchased = BigNumber.from(purchased).add(BigNumber.from(bond.tokensInStrategy)).toString();
      }
  
      // #TODO check
      purchased = purchased / Math.pow(10, tokenDecimals);
    }

    return {
      bond: bond.id,
      bondDiscount,
      bondQuote,
      purchased,
      vestingTerm: Number(terms.vestingTerm),
      maxBondPrice,
      bondPrice,
      marketPrice,
      maxBondPriceToken,
      minPurchase
    };
  }
);

interface IBondAsset {
  value: string;
  address: string;
  bond: Bond;
  networkID: number;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  slippage: number;
  useNativeCurrency: boolean;
}

export const bondAsset = createAsyncThunk(
  'bonding/bondAsset',
  async (
    { value, address, bond, networkID, provider, slippage, useNativeCurrency }: IBondAsset,
    { dispatch }
  ) => {
    const depositorAddress: string = address;
    const acceptedSlippage: number = slippage / 100 || 0.005;
    const tokenDecimals: number = getToken(bond.id, 'decimals');
    // @ts-ignore
    const transformedValue: string = String(value * Math.pow(10, tokenDecimals));
    // const valueInWei: BigNumber = ethers.utils.parseUnits(transformedValue, 'ether');
    const valueInWei: string = transformedValue;
    const signer = provider.getSigner();
    const bondContract = new ethers.Contract(bond.bondAddress, StableBondContract, signer);
    const calculatePremium = await bondContract.bondPrice();
    const maxPremium: number = Math.round(calculatePremium * (1 + acceptedSlippage));
    let bondTx;
    try {
      const gasPrice: BigNumber = await getGasPrice(provider);
      if (useNativeCurrency) {
        bondTx = await bondContract.deposit(valueInWei, maxPremium, depositorAddress, { value: valueInWei, gasPrice });
      } else {
        bondTx = await bondContract.deposit(valueInWei, maxPremium, depositorAddress, { gasPrice });
      }
      dispatch(
        fetchPendingTxns({
          txnHash: bondTx.hash,
          text: 'Bonding ' + bond.displayName,
          type: 'bond_' + String(bond.id)
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

export const redeemBond = createAsyncThunk(
  'bonding/redeemBond',
  async ({ address, bond, networkID, provider, autostake }: IRedeemBond,
  { dispatch }): Promise<void | undefined> => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    
    const signer = provider.getSigner();
    // const bondContract = bond.getContractForBond(networkID, signer);
    const bondContract = new ethers.Contract(bond.bondAddress, StableBondContract, signer);
    
    let redeemTx;
    try {
      const gasPrice = await getGasPrice(provider);
      
      redeemTx = await bondContract.redeem(address, autostake, { gasPrice });
      const pendingTxnType = 'redeem_bond_' + String(bond.id) + (autostake ? '_autostake' : '');
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

const setBondState = (state: IBondSlice, payload: any): void => {
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
