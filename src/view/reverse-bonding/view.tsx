import React, { FC, memo, ReactElement, useState, useEffect, ChangeEvent } from 'react';
import { InputAdornment, OutlinedInput, Zoom } from '@material-ui/core';
import Header from './components/header';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '@store/slices/state.interface';
import { getBondAddresses, sleep, trim } from '@services/helpers';
import { Contract, ethers, BigNumberish, BigNumber, utils } from 'ethers';
import {
  clearPendingTxn,
  fetchPendingTxns,
  IPendingTxn,
  isPendingTxn,
  txnButtonText
} from '@store/slices/pending-txns-slice';
import { useAddress, useCommonContext } from '@services/hooks/network';
import { dYelTokenContract, ReverseBondingContract } from '@services/abi';
import { getCurrentNetwork } from '@services/common/network';
import { IBlockchain } from '@models/blockchain';
import useDebounce from '@services/hooks/debounce';
import { getGasPrice } from '@services/helpers/get-gas-price';
import { error, info, success } from '@store/slices/messages-slice';
import { messages } from '@constants/messages';
import { metamaskErrorWrap } from '@services/helpers/metamask-error-wrap';

import './styles.scss';
import { getBalances } from '@store/slices/account-slice';

export const ReverseBonding: FC = memo((): ReactElement => {
  const dispatch = useDispatch();
  const address: string = useAddress();
  const { provider } = useCommonContext();
  const chainId: string = useSelector((state: IReduxState) => state.network.chainId);
  const dYelPrice: number = useSelector((state: IReduxState) => state.app?.dYelPrice);
  const dYelAccountBalance: string = useSelector((state: IReduxState) => state.account?.balances?.dYel);
  const pendingTransactions: IPendingTxn[] = useSelector((state: IReduxState) => state.pendingTransactions);
  const networkId: number = Number(chainId);
  const { REVERSE_BONDING_ADDRESS, DYEL_ADDRESS } = getBondAddresses(networkId) || {};
  const currentNetwork: IBlockchain.INetwork | undefined = getCurrentNetwork(chainId);
  const signer = provider.getSigner();
  let usdcDecimals: number = 6;
  
  const [amount, setAmount] = useState<string>('');
  const [isPending, setIsPending] = useState<boolean>(false);
  const [usdcValue, setUsdcValue] = useState<number | string>(0);
  const [reverseBondingPenalty, setReverseBondingPenalty] = useState<number>(0);
  const [reverseBondingContract, setReverseBondingContract] = useState<Contract | null>(null);
  const [dYelContract, setDYelContract] = useState<Contract | null>(null);
  const [hasAllowance, setHasAllowance] = useState<boolean>(false);
  
  const usdcValueDebounce = useDebounce(amount, 500);
  
  if (currentNetwork?.id === 'BSC') {
    usdcDecimals = 18;
  }
  
  useEffect(() => {
    (async function() {
      const reverseBondingContract: Contract = new Contract(REVERSE_BONDING_ADDRESS, ReverseBondingContract, signer);
      const reverseBondingPenalty: number = (await reverseBondingContract.percentPenalty()) / 1;
  
      setReverseBondingContract(reverseBondingContract);
      setReverseBondingPenalty(reverseBondingPenalty);
    })();
  }, [provider, REVERSE_BONDING_ADDRESS]);
  
  useEffect((): void => {
    (async function() {
      await onHandleUsdcAmount();
    })();
  }, [usdcValueDebounce]);
  
  useEffect((): void => {
    (async function() {
      await onHandleAllowance();
    })();
  }, [dYelContract]);
  
  useEffect((): void => {
    const newDYelContract: Contract = new Contract(DYEL_ADDRESS, dYelTokenContract, signer);
    setDYelContract(newDYelContract);
  }, [provider, DYEL_ADDRESS]);
  
  useEffect((): void => {
    setIsPending(
      isPendingTxn(pendingTransactions, 'approve_reverse_bonding')
      || isPendingTxn(pendingTransactions, 'claim_reverse_bonding')
    );
  }, [pendingTransactions]);
  
  const onHandleAllowance = async (): Promise<void> => {
    if (dYelContract) {
      const dYelAllowance = await dYelContract.allowance(address, REVERSE_BONDING_ADDRESS);
  
      setHasAllowance(!!Number(dYelAllowance));
    } else {
      setHasAllowance(false);
    }
  };
  
  const setMax = async (): Promise<void> => {
    setAmount(dYelAccountBalance);
  };
  
  const onHandleUsdcAmount = async (): Promise<void> => {
    if (Number(amount) > 0) {
      try {
        const valueOfDYEL = BigNumber.from(String(+amount * Math.pow(10, 18)));
        const [userAmount,] = await reverseBondingContract?.valueOfDYEL(valueOfDYEL);
        setUsdcValue(userAmount / Math.pow(10, usdcDecimals));
      } catch (e) {
        console.log(e);
      }
    } else {
      setUsdcValue(0);
    }
  };
  
  const onHandleSetAmount = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const { value } = e.target as HTMLInputElement;
    setAmount(value);
  };
  
  const onApprove = async (): Promise<void> => {
    if (!isPendingTxn(pendingTransactions, 'approve_reverse_bonding')) {
      let approveTx;
      
      setIsPending(true);
  
      try {
        const gasPrice = await getGasPrice(provider);
        approveTx = await dYelContract?.approve(REVERSE_BONDING_ADDRESS, ethers.constants.MaxUint256, { gasPrice });
    
        const pendingTxnType: string = 'approve_reverse_bonding';
        const text: string = 'Approve Reverse Bonding';
    
        dispatch(fetchPendingTxns({ txnHash: approveTx.hash, text, type: pendingTxnType }));
    
        await approveTx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
      } catch (err) {
        metamaskErrorWrap(err, dispatch);
      } finally {
        if (approveTx) {
          dispatch(clearPendingTxn(approveTx.hash));
        }
        setIsPending(false);
      }
      
      await onHandleAllowance();
    }
  };
  
  const onClaim = async (): Promise<void> => {
    if (!isPendingTxn(pendingTransactions, 'claim_reverse_bonding')) {
      if (Number(amount) > 0)  {
        let claimTx;
        
        setIsPending(true);
        
        try {
          const claimValue: string = String(+amount * Math.pow(10, 18));
          
          claimTx = await reverseBondingContract?.claim(claimValue);
          
          const pendingTxnType: string = 'claim_reverse_bonding';
          const text: string = 'Claim Reverse Bonding';
  
          dispatch(fetchPendingTxns({ txnHash: claimTx.hash, text, type: pendingTxnType }));
  
          await claimTx.wait();
          
          dispatch(success({ text: messages.tx_successfully_send }));
          dispatch(info({ text: messages.your_balance_update_soon }));
  
          await sleep(5);
          await dispatch(getBalances({ address, networkID: networkId, provider }));
          
          dispatch(info({ text: messages.your_balance_updated }));
        } catch (err) {
          console.log(err);
          metamaskErrorWrap(err, dispatch);
        } finally {
          if (claimTx) {
            dispatch(clearPendingTxn(claimTx?.hash));
          }
        }
        setIsPending(false);
      } else {
        dispatch(error({ text: messages.pls_enter_dyel_amount }));
      }
    }
  };
  
  const onRenderActionButton = (): ReactElement => {
    let label: string;
    let onAction: (() => void) | undefined;
    
    if (isPending) {
      label = 'Pending....';
      onAction = undefined;
    } else if (!hasAllowance) {
      label = 'Approve';
      onAction = onApprove;
    } else {
      label = 'Claim';
      onAction = onClaim;
    }
    
    return (
      <span
        onClick={onAction}
        className="action--btn btn__primary--fulfilled"
      >
        {label}
      </span>
    );
  };
  
  return (
    <div className="reverse--bonding page">
      <Zoom in={true}>
        <div className="wrapper">
          <Header />
          <div className="inner">
            <div className="data card card--custom">
              <div className="data__row">
                <div className="data__row__label">{'balance'}</div>
                <div className="data__row__value">{`${trim(Number(dYelAccountBalance), 4)} dYEL`}</div>
              </div>
              <div className="data__row">
                <div className="data__row__label">{'dYEL Price'}</div>
                <div className="data__row__value">{`1 dYEL = $${trim(dYelPrice, 2)}`}</div>
              </div>
              <div className="data__row">
                <div className="data__row__label">{'Reverse bonding penalty '}</div>
                <div className="data__row__value">{`${reverseBondingPenalty} %`}</div>
              </div>
            </div>
            <div className="form card card--custom">
              <div className="field__wrapper">
                <OutlinedInput
                  inputProps={{
                    min: 0,
                  }}
                  type="number"
                  labelWidth={0}
                  value={amount}
                  placeholder="dYel"
                  classes={{
                    root: 'input__root',
                    input: 'input',
                  }}
                  disabled={!hasAllowance}
                  endAdornment={
                    <InputAdornment position="end">
                      <div onClick={setMax} className="input__btn--max">{'Max'}</div>
                    </InputAdornment>
                  }
                  onChange={onHandleSetAmount}
                />
              </div>
  
              <div className="field__wrapper">
                <OutlinedInput
                  disabled
                  type="number"
                  labelWidth={0}
                  value={usdcValue}
                  placeholder="Amount"
                  classes={{
                    root: 'input__root',
                    input: 'input',
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <div
                        className="input__btn--max"
                        style={{ cursor: 'default' }}
                      >
                        {'USDC'}
                      </div>
                    </InputAdornment>
                  }
                />
              </div>
              <p className="description">
                Note: The "Approve" transaction is only needed when wrapping for the first time; subsequent wrapping
                only requires you to perform the "Wrap" transaction
              </p>
              {onRenderActionButton()}
            </div>
          </div>
        </div>
      </Zoom>
    </div>
  );
});