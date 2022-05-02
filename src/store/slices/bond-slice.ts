import { BigNumber, constants, ethers, Contract, ContractInterface } from 'ethers';
import { sleep, getBondAddresses } from '@services/helpers';
import { getMarketPrice } from '@services/common/prices/get-market-price'
import { calculateUserBondDetails, fetchAccountSuccess, getBalances } from './account-slice';
import { clearPendingTxn, fetchPendingTxns } from './pending-txns-slice';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { JsonRpcProvider, StaticJsonRpcProvider } from '@ethersproject/providers';
import { Bond } from '@services/common/bond/bond';
import { IBlockchain } from '@models/blockchain';
import { RootState } from '../store';
import { error, info, success, warning } from '../slices/messages-slice';
import { messages } from '@constants/messages';
import { getGasPrice } from '@services/helpers/get-gas-price';
import { metamaskErrorWrap } from '@services/helpers/metamask-error-wrap';
import { NativeBondContract, StableBondContract, wFTMReserveContract, CustomBondContract } from '@services/abi';
import { getToken } from '@services/helpers/get-token';
import { getBondPrice } from '@services/common/bond/get-bond-price';
import { useSelector } from 'react-redux';
import { IReduxState } from '@store/slices/state.interface';

interface IChangeApprovalArgs {
  bond: Bond;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  networkID: number;
  address: string;
  tokens: IBlockchain.IToken[];
}
interface ICalcBondDetails {
  bond: Bond;
  value: string | null;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  networkID: number;
  tokens: IBlockchain.IToken[];
}
interface IRedeemBond {
  address: string;
  bond: Bond;
  networkID: number;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  autostake: boolean;
  tokens: IBlockchain.IToken[];
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
  async ({ bond, provider, networkID, address, tokens }: IChangeApprovalArgs,
  { dispatch }) => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    
    const signer = provider.getSigner();
    const reserveContract: Contract = new Contract(bond.getReserveAddress(tokens), wFTMReserveContract, signer);
    
    let approveTx;
    try {
      const gasPrice: BigNumber = await getGasPrice(provider);
      approveTx = await reserveContract.approve(bond.bondAddress, constants.MaxUint256, { gasPrice });
      
      dispatch(
        fetchPendingTxns({
          txnHash: approveTx.hash,
          text: 'Approving ' + String(bond.displayName),
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
  async ({ bond, value, provider, networkID, tokens }: ICalcBondDetails,
  { dispatch }) => {
    if (!value) {
      value = '0';
    }
    try {
      const { id: bondId, bondAddress, isWrap } = bond;
      const { TREASURY_ADDRESS } = getBondAddresses(networkID);
      const amountInWei: BigNumber = ethers.utils.parseEther(value);
      const bondCalcContract: Contract = bond.getBondCalculatorContract(networkID, provider);
      let contractAbi: ContractInterface;
      
      if (isWrap) {
        contractAbi = NativeBondContract; // wFTM bond ABI
      } else if (
        bondId === 'TSHARE'
        || bondId === 'YFI'
        || bondId === 'BIFI'
        || bondId === 'QUICK'
        || bondId === 'wMEMO'
      ) {
        contractAbi = CustomBondContract;
      } else {
        contractAbi = StableBondContract;
      }
      
      const bondContract: Contract = new Contract(bondAddress, contractAbi, provider);
      const terms = await bondContract.terms();
      const maxBondPrice: number = (await bondContract.maxPayout()) / Math.pow(10, 9);
      // #TODO leave getMarketPrice() to store
      const marketPrice: number = await getMarketPrice(networkID, provider, tokens);
      const minPurchase: number = (await bondContract.minPayout()) / Math.pow(10, 9);
      const maxBodValue = ethers.utils.parseEther('1');
      const bigNativeCurrencyLPToken: IBlockchain.IToken | undefined = tokens
        .find(({ isBigNativeCurrencyLP }: IBlockchain.IToken) => isBigNativeCurrencyLP);
      const bigNativeCurrencyLPTokenAddress: string = bigNativeCurrencyLPToken?.address || 'unknown';
      let valuation: number = 0;
      let bondQuote: number = 0;
      let maxBondPriceToken: number = 0;
  
      const bondPrice: number = await getBondPrice({ bond, networkID, provider, tokens });
      const bondDiscount: number = (marketPrice - bondPrice) / marketPrice;
      
      if (bond.isLP) {
        try {
          valuation = await bondCalcContract.valuation(bigNativeCurrencyLPTokenAddress, amountInWei);
          bondQuote = await bondContract.payoutFor(valuation);
        } catch (e) {
          console.log('valuation, payoutFor error: ', e);
        }
    
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
      } else if (value !== '0' && bondQuote < minPurchase) {
        dispatch(error({ text: messages.try_mint_less(minPurchase.toString()) }));
      }
      
      // Calculate bonds purchased
      const token: Contract = new ethers.Contract(bond.getReserveAddress(tokens), wFTMReserveContract, provider);
      const tokenDecimals: number = await token.decimals();
      
      let purchased: any = 0;
  
      if (TREASURY_ADDRESS) {
        purchased = await token.balanceOf(TREASURY_ADDRESS);
  
        if (bond.isLP) {
          const markdown = await bondCalcContract.markdown(bigNativeCurrencyLPTokenAddress);
  
          purchased = await bondCalcContract.valuation(bigNativeCurrencyLPTokenAddress, purchased);
          purchased = (markdown / Math.pow(10, 18)) * (purchased / Math.pow(10, 9));
        } else {
          if (bond.tokensInStrategy) {
            purchased = BigNumber.from(purchased).add(BigNumber.from(bond.tokensInStrategy)).toString();
          }
    
          // #TODO check
          purchased = Number(purchased) / Math.pow(10, tokenDecimals);
        }
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
    } catch (e) {
      console.log('calcBondDetails() e: ', bond.id, e);
      throw new Error('calcBondDetails() Error');
    }
  }
);

interface IBondAssetArgs {
  value: string;
  address: string;
  bond: Bond;
  networkID: number;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  slippage: number;
  useNativeCurrency: boolean;
  tokens: IBlockchain.IToken[];
}

export const bondAsset = createAsyncThunk(
  'bonding/bondAsset',
  async (
    { value, address, bond, networkID, provider, slippage, useNativeCurrency, tokens }: IBondAssetArgs,
    { dispatch }
  ) => {
    const depositorAddress: string = address;
    const acceptedSlippage: number = slippage / 100 || 0.005;
    const tokenDecimals: number = getToken(tokens, bond.id, 'decimals');
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
          text: 'Bonding ' + String(bond.displayName),
          type: 'bond_' + String(bond.id)
        })
      );
      await bondTx.wait();
      dispatch(success({ text: messages.tx_successfully_send }));
      dispatch(info({ text: messages.your_balance_update_soon }));
      await sleep(10);
      await dispatch(calculateUserBondDetails({ address, bond, tokens, provider }));
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
  async ({ address, bond, networkID, provider, autostake, tokens }: IRedeemBond,
  { dispatch }): Promise<void | undefined> => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
  
    const signer = provider.getSigner();
    const bondContract = new ethers.Contract(bond.bondAddress, StableBondContract, signer);
    
    let redeemTx;
    try {
      const gasPrice = await getGasPrice(provider);
      
      redeemTx = await bondContract.redeem(address, autostake, { gasPrice });
      const pendingTxnType = 'redeem_bond_' + String(bond.id) + (autostake ? '_autostake' : '');
      dispatch(
        fetchPendingTxns({
          txnHash: redeemTx.hash,
          text: 'Redeeming ' + String(bond.displayName),
          type: pendingTxnType
        })
      );
      await redeemTx.wait();
      dispatch(success({ text: messages.tx_successfully_send }));
      await sleep(0.01);
      dispatch(info({ text: messages.your_balance_update_soon }));
      await sleep(10);
      await dispatch(calculateUserBondDetails({ address, bond, tokens, provider }));
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
