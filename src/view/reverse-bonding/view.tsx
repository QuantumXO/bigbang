import React, { FC, memo, ReactElement, useState } from 'react';
import { InputAdornment, OutlinedInput, Zoom } from '@material-ui/core';
import Header from './components/header';
import { useSelector } from 'react-redux';
import { IReduxState } from '@store/slices/state.interface';
import { trim } from '@services/helpers';
import { IPendingTxn, isPendingTxn, txnButtonText } from '@store/slices/pending-txns-slice';

import './styles.scss';

export const ReverseBonding: FC = memo((): ReactElement => {
  const dYelPrice: number = useSelector((state: IReduxState) => state.app?.dYelPrice);
  const dYelAccountBalance: string = useSelector((state: IReduxState) => state.account?.balances?.dYel);
  const pendingTransactions: IPendingTxn[] = useSelector((state: IReduxState) => state.pendingTransactions);
  
  const [amount, setAmount] = useState<string>('');
  const [usdcValue, setUsdcValue] = useState<string>('');
  
  const hasAllowance: boolean = false;
  
  const setMax = (): void => {
    //
  };
  
  const onHandleSetAmount = (): void => {
    //
  };
  
  const onApprove = (): void => {
    //
  };
  
  const onClaim = (): void => {
    //
  };
  
  const onRenderActionButton = (): ReactElement => {
    let label: string;
    let onAction: () => void;
    
    if (hasAllowance) {
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
                <div className="data__row__value">{`0 %`}</div>
              </div>
            </div>
            <div className="form card card--custom">
              <div className="field__wrapper">
                <OutlinedInput
                  type="number"
                  labelWidth={0}
                  value={amount}
                  placeholder="dYel"
                  classes={{
                    root: 'input__root',
                    input: 'input',
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <div onClick={setMax} className="input__btn--max">{'Max'}</div>
                    </InputAdornment>
                  }
                  onChange={e => setAmount(e.target.value)}
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
                      <div className="input__btn--max">{'USDC'}</div>
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