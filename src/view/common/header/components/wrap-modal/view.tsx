import { Modal, Paper, SvgIcon, IconButton, Input, OutlinedInput, InputAdornment } from '@material-ui/core';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { ReactComponent as XIcon } from '@assets/images/common/icons/x.svg';
import { ReactComponent as ArrowsIcon } from '@assets/images/common/icons/arrows.svg';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '@store/slices/state.interface';
import { trim } from '@services/helpers';
import { calcWrapDetails, changeWrap, changeApproval, calcWrapPrice } from '@store/slices/wrap-slice';
import { error, warning } from '@store/slices/messages-slice';
import { messages } from '@constants/messages';
import { IPendingTxn, isPendingTxn, txnButtonText } from '@store/slices/pending-txns-slice';
import React from 'react';
import { useCommonContext } from '@services/hooks/network';

import './styles.scss';

interface IProps {
  onClose?: () => void;
}

export function WrapModal({ onClose }: IProps): ReactElement {
  const dispatch = useDispatch();
  const { chainId } = useSelector((state: IReduxState) => state.network);
  const { getIsWrongNetwork, provider, address, isActiveWrapModal, toggleWrapModal } = useCommonContext();
  const networkID: number = Number(chainId);
  const wrapBond: string = 'BANG'
  const unwrapBond: string = 'dYEL'
  
  const [value, setValue] = useState<string>('');
  const [isWrap, setIsWrap] = useState<boolean>(true);
  const [isWrapPrice, setIsWrapPrice] = useState<boolean>(true);
  // #TODO need to fix & remove
  const [WTF_isApproved, WTF_setIsApproved] = useState<boolean>(false);
  
  const bangBalance = useSelector<IReduxState, string>(state => {
    return state.account.balances && state.account.balances.bang;
  });
  const dYelBalance = useSelector<IReduxState, string>(state => {
    return state.account.balances && state.account.balances.dYel;
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
  const bangAllowance: number = useSelector<IReduxState, number>(state => {
    return state.account.wrapping?.bang;
  });
  
  const hasAllowance = useCallback((): boolean => bangAllowance > 0, [bangAllowance]);
  
  const trimmedBangBalance: string = trim(Number(bangBalance), 6);
  const trimmedDYelBalance: string = trim(Number(dYelBalance), 6);
  
  useEffect((): void => {
    dispatch(calcWrapDetails({ isWrap, provider, value, networkID }));
  }, [value]);
  
  useEffect((): void => {
    if (getIsWrongNetwork()) return;
    dispatch(calcWrapPrice({ isWrap: isWrapPrice, provider, networkID }));
  }, [isWrapPrice]);
  
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
  
  const onHandleClose = (): void => {
    onClose && onClose();
    
    setValue('');
    setIsWrap(true);
    setIsWrapPrice(true);
    dispatch(calcWrapDetails({ isWrap, provider, value: '', networkID }));
    toggleWrapModal(false);
  };
  
  const getBalance = (): string => isWrap ? `${trimmedBangBalance} ${wrapBond}` : `${trimmedDYelBalance} ${unwrapBond}`;
  
  const handleOnWrap = async () => {
    if (!getIsWrongNetwork()) {
      if (value === '' || parseFloat(value) === 0) {
        dispatch(warning({ text: isWrap ? messages.before_wrap : messages.before_unwrap }));
      } else {
        await dispatch(changeWrap({ isWrap, value, provider, networkID, address }));
        setValue('');
      }
    } else {
      dispatch(error({ text: messages.wrong_network }));
    }
  };
  
  const onSeekApproval = async () => {
    if (!getIsWrongNetwork()) {
      const result = await dispatch(changeApproval({ address, provider, networkID }));
      
      // @ts-ignore
      const isError: boolean = result?.payload?.type === 'messages/error';
      
      WTF_setIsApproved(!isError);
    } else {
      dispatch(error({ text: messages.wrong_network }));
    }
  };
  
  const onSetMax = (): void => setValue(isWrap ? bangBalance : dYelBalance);
  
  const onRenderApproveBtn = (): ReactElement => {
    return (
      <>
        {(hasAllowance() || WTF_isApproved)
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
      open={isActiveWrapModal}
      className="modal wrap"
      BackdropProps={{
        style: {
          background: 'none'
        }
      }}
      onClose={onHandleClose}
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
            onClick={onHandleClose}
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
                    <div onClick={onSetMax} className="input__btn--max">{'Max'}</div>
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
