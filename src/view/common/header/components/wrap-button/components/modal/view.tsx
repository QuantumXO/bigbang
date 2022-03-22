import { Modal, Paper, SvgIcon, IconButton, Input, OutlinedInput, InputAdornment } from '@material-ui/core';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { ReactComponent as XIcon } from '@assets/images/icons/x.svg';
import { ReactComponent as ArrowsIcon } from '@assets/images/icons/arrows.svg';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '@store/slices/state.interface';
import { trim } from '@services/helpers';
import { calcWrapDetails, changeWrap, changeApproval, calcWrapPrice } from '@store/slices/wrap-slice';
import { useWeb3Context } from '@services/hooks';
import { warning } from '@store/slices/messages-slice';
import { messages } from '@constants/messages';
import { IPendingTxn, isPendingTxn, txnButtonText } from '@store/slices/pending-txns-slice';

import './styles.scss';
import * as React from 'react';

interface IAdvancedSettingsProps {
  isOpen: boolean;
  closeWrapModal: () => void;
}

export function WrapModal({ isOpen, closeWrapModal }: IAdvancedSettingsProps): ReactElement {
  const dispatch = useDispatch();
  const { provider, address, chainID, checkIsWrongNetwork } = useWeb3Context();
  const wrapBond: string = 'BANG'
  const unwrapBond: string = 'dYEL'
  
  const [value, setValue] = useState('');
  const [isWrap, setIsWrap] = useState(true);
  const [isWrapPrice, setIsWrapPrice] = useState(true);
  
  const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
  const memoBalance = useSelector<IReduxState, string>(state => {
    return state.account.balances && state.account.balances.memo;
  });
  const wmemoBalance = useSelector<IReduxState, string>(state => {
    return state.account.balances && state.account.balances.wmemo;
  });
  const wrapValue = useSelector<IReduxState, string>(state => {
    return state.wrapping && state.wrapping.wrapValue;
  });
  const wrapPrice = useSelector<IReduxState, number>(state => {
    return state.wrapping && state.wrapping.wrapPrice;
  });
  const pendingTransactions: IPendingTxn[] = useSelector<IReduxState, IPendingTxn[]>(state => {
    return state.pendingTransactions;
  });
  const memoAllowance: number = useSelector<IReduxState, number>(state => {
    return state.account.wrapping && state.account.wrapping.memo;
  });
  
  useEffect((): void => {
    dispatch(calcWrapDetails({ isWrap, provider, value, networkID: chainID }));
  }, [value]);
  
  useEffect((): void => {
    dispatch(calcWrapPrice({ isWrap: isWrapPrice, provider, networkID: chainID }));
  }, [isWrapPrice]);
  
  const hasAllowance = useCallback((): boolean => memoAllowance > 0, [memoAllowance]);
  
  const handleSwap = (): void => {
    setValue('');
    const value: boolean = !isWrap;
    setIsWrap(value);
    setIsWrapPrice(value);
  };
  
  const handleValueChange = (e: any): void => {
    const value = e.target.value;
    setValue(value);
  };
  
  const onClose = (): void => {
    setValue('');
    setIsWrap(true);
    setIsWrapPrice(true);
    dispatch(calcWrapDetails({ isWrap, provider, value: '', networkID: chainID }));
    closeWrapModal();
  };
  
  const trimmedMemoBalance: string = trim(Number(memoBalance), 6);
  const trimmedWmemoBalance: string = trim(Number(wmemoBalance), 6);
  
  const getBalance = (): string => isWrap ? `${trimmedMemoBalance} ${wrapBond}` : `${trimmedWmemoBalance} ${unwrapBond}`;
  
  const handleOnWrap = async () => {
    if (await checkIsWrongNetwork()) return;
    
    if (value === '' || parseFloat(value) === 0) {
      dispatch(warning({ text: isWrap ? messages.before_wrap : messages.before_unwrap }));
    } else {
      await dispatch(changeWrap({ isWrap, value, provider, networkID: chainID, address }));
      setValue('');
    }
  };
  
  const onSeekApproval = async () => {
    if (await checkIsWrongNetwork()) return;
    
    await dispatch(changeApproval({ address, provider, networkID: chainID }));
  };
  
  const onRenderApproveBtn = (): ReactElement => {
    return (
      <>
        {hasAllowance()
          ? (
            <div
              className="action--btn btn__primary--fulfilled"
              onClick={() => {
                const inPending: boolean = isWrap
                  ? isPendingTxn(pendingTransactions, 'wrapping')
                  : isPendingTxn(pendingTransactions, 'unwrapping');
                if (inPending) return;
                handleOnWrap();
              }}
            >
              {isWrap
                ? txnButtonText(pendingTransactions, 'wrapping', 'Wrap')
                : txnButtonText(pendingTransactions, 'unwrapping', 'Unwrap')
              }
            </div>
          )
          : (
            <div
              className="action--btn btn__primary--fulfilled"
              onClick={(): void => {
                if (isPendingTxn(pendingTransactions, 'approve_wrapping')) return;
                onSeekApproval();
              }}
            >
              {txnButtonText(pendingTransactions, 'approve_wrapping', 'Approve')}
            </div>
          )
        }
      </>
    );
  };
  
  return (
    <Modal
      id="hades"
      open={isOpen}
      className="modal wrap"
      BackdropProps={{
        style: {
          background: 'none'
        }
      }}
      onClose={onClose}
    >
      <Paper className="wrapper">
        <div className="modal__header">
          <h1 className="title">{'WRAP'}</h1>
          <div className="balance__wrap">
            <div className="balance__wrap__inner">
              <span className="label">{'Balance'}</span>
              <span className="value">{getBalance()}</span>
            </div>
            <div className="price">
              1&nbsp;
              {isWrapPrice ? wrapBond : unwrapBond}&nbsp;
              =&nbsp;
              {`${trim(wrapPrice, 4)} ${isWrapPrice ? unwrapBond : wrapBond}`}
            </div>
          </div>
          <SvgIcon
            color="primary"
            component={XIcon}
            fontSize="small"
            className="close__btn"
            onClick={onClose}
          />
        </div>
        
        <div className="modal__container">
          <div className="bonds">
            <div className="field__wrapper">
              <OutlinedInput
                type="number"
                labelWidth={0}
                value={value}
                placeholder={`${isWrapPrice ? wrapBond : unwrapBond} Amount`}
                classes={{
                  root: 'input__root',
                  input: 'input',
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <div onClick={undefined} className="input__btn--max">{'Max'}</div>
                  </InputAdornment>
                }
                onChange={handleValueChange}
              />
            </div>
            
            <div className="bonds--toggle">
              <IconButton onClick={handleSwap}>
                <SvgIcon color="primary" component={ArrowsIcon} fontSize="medium" className="bonds--toggle__svg" />
              </IconButton>
            </div>
  
            <div className="field__wrapper">
              <OutlinedInput
                disabled
                type="number"
                labelWidth={0}
                value={wrapValue}
                placeholder={`${isWrapPrice ? unwrapBond : wrapBond} Amount`}
                classes={{
                  root: 'input__root',
                  input: 'input',
                }}
              />
            </div>
          </div>
          {!hasAllowance() && (
            <p className="modal__description">
              Note: The "Approve" transaction is only needed when wrapping for the first time; subsequent wrapping
              only requires you to perform the "Wrap" transaction.
            </p>
          )}
          {onRenderApproveBtn()}
        </div>
      </Paper>
    </Modal>
  );
}
