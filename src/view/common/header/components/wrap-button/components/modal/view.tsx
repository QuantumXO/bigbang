import { Modal, Paper, SvgIcon, IconButton, Input } from '@material-ui/core';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { ReactComponent as XIcon } from '@assets/images/icons/x.svg';
import { ReactComponent as ArrowsIcon } from '@assets/images/icons/arrows.svg';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '@store/slices/state.interface';
import { trim } from '@services/helpers';
import { Skeleton } from '@material-ui/lab';
import { calcWrapDetails, changeWrap, changeApproval, calcWrapPrice } from '@store/slices/wrap-slice';
import { useWeb3Context } from '@services/hooks';
import { warning } from '@store/slices/messages-slice';
import { messages } from '@constants/messages';
import { IPendingTxn, isPendingTxn, txnButtonText } from '@store/slices/pending-txns-slice';

import './styles.scss';

interface IAdvancedSettingsProps {
  open: boolean;
  handleClose: () => void;
}

export function WrapModal({ open, handleClose }: IAdvancedSettingsProps): ReactElement {
  const dispatch = useDispatch();
  const { provider, address, chainID, checkIsWrongNetwork } = useWeb3Context();
  const wrapBond: string = 'LIGHT'
  const unwrapBond: string = 'wLIGHT'
  
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
  
  useEffect((): void => {
    dispatch(calcWrapDetails({ isWrap, provider, value, networkID: chainID }));
  }, [value]);
  
  useEffect((): void => {
    dispatch(calcWrapPrice({ isWrap: isWrapPrice, provider, networkID: chainID }));
  }, [isWrapPrice]);
  
  const onClose = (): void => {
    setValue('');
    setIsWrap(true);
    setIsWrapPrice(true);
    dispatch(calcWrapDetails({ isWrap, provider, value: '', networkID: chainID }));
    handleClose();
  };
  
  const hasAllowance = useCallback((): boolean => memoAllowance > 0, [memoAllowance]);
  
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
              className="action--btn"
              onClick={() => {
                const inPending: boolean = isWrap
                  ? isPendingTxn(pendingTransactions, 'wrapping')
                  : isPendingTxn(pendingTransactions, 'unwrapping');
                if (inPending) return;
                handleOnWrap();
              }}
            >
              <span>
                {isWrap
                  ? txnButtonText(pendingTransactions, 'wrapping', 'Wrap')
                  : txnButtonText(pendingTransactions, 'unwrapping', 'Unwrap')
                }
              </span>
            </div>
          )
          : (
            <div
              className="action--btn"
              onClick={(): void => {
                if (isPendingTxn(pendingTransactions, 'approve_wrapping')) return;
                onSeekApproval();
              }}
            >
              <span>{txnButtonText(pendingTransactions, 'approve_wrapping', 'Approve')}</span>
            </div>
          )
        }
      </>
    );
  };
  
  return (
    <Modal
      id="hades"
      open={open}
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
          <div>
            <h1 className="title">{'WRAP'}</h1>
            <div className="wrap--price" onClick={() => setIsWrapPrice(!isWrapPrice)}>
              1&nbsp;
              {isWrapPrice ? wrapBond : unwrapBond}&nbsp;
              =&nbsp;
              {`${trim(wrapPrice, 4)} ${isWrapPrice ? unwrapBond : wrapBond}`}
            </div>
          </div>
          <IconButton onClick={onClose} className="close__btn">
            <SvgIcon color="primary" component={XIcon} className="modal__close__btn" />
          </IconButton>
        </div>
        
        <div className="modal__container">
          <div className='balance'>
            {'Your Balance'}: {isAppLoading ? <Skeleton width="80px" /> : <>{getBalance()}</>}
          </div>
          <div className="bonds">
            <div className='field__wrapper'>
              <span className='field__label'>{isWrapPrice ? wrapBond : unwrapBond}</span>
              <Input
                value={value}
                type="number"
                placeholder="Amount"
                className="field__input__wrapper"
                onChange={handleValueChange}
                inputProps={{
                  className: "field__input"
                }}
              />
            </div>
            <div className="bonds--toggle">
              <IconButton onClick={handleSwap}>
                <SvgIcon color="primary" component={ArrowsIcon} fontSize="large" />
              </IconButton>
            </div>
            <div className='field__wrapper'>
              <span className='field__label'>{isWrapPrice ? unwrapBond : wrapBond}</span>
              <Input
                disabled
                type="number"
                value={wrapValue}
                placeholder="Amount"
                className="field__input__wrapper"
                inputProps={{
                  className: "field__input"
                }}
              />
            </div>
          </div>
          {onRenderApproveBtn()}
          {!hasAllowance() && (
            <div className="modal__description">
              <p>Note: The "Approve" transaction is only needed when wrapping for the first time; subsequent wrapping
                only requires you to perform the "Wrap" transaction.
              </p>
            </div>
          )}
        </div>
      </Paper>
    </Modal>
  );
}
