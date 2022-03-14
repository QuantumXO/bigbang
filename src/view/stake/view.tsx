import { useState, useCallback, ReactElement, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, InputAdornment, OutlinedInput, Zoom } from '@material-ui/core';
import RebaseTimer from './components/rebaseTimer';
import { trim } from '@services/helpers';
import { changeStake, changeApproval } from '@store/slices/stake-thunk';
import { useWeb3Context } from '@services/hooks';
import { IPendingTxn, isPendingTxn, txnButtonText } from '@store/slices/pending-txns-slice';
import { Skeleton } from '@material-ui/lab';
import { IReduxState } from '@store/slices/state.interface';
import { messages } from '@constants/messages';
import cx from 'classnames';
import { warning } from '@store/slices/messages-slice';

import './styles.scss';

export function Stake(): ReactElement {
  const dispatch = useDispatch();
  const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();
  
  const [view, setView] = useState(0);
  const [quantity, setQuantity] = useState<string>('');
  
  const isAppLoading: boolean = useSelector<IReduxState, boolean>(state => state.app.loading);
  const currentIndex: string = useSelector<IReduxState, string>(state => {
    return state.app.currentIndex;
  });
  const fiveDayRate: number = useSelector<IReduxState, number>(state => {
    return state.app.fiveDayRate;
  });
  const timeBalance: string = useSelector<IReduxState, string>(state => {
    return state.account.balances && state.account.balances.time;
  });
  const memoBalance: string = useSelector<IReduxState, string>(state => {
    return state.account.balances && state.account.balances.memo;
  });
  const stakeAllowance: number = useSelector<IReduxState, number>(state => {
    return state.account.staking && state.account.staking.time;
  });
  const unstakeAllowance: number = useSelector<IReduxState, number>(state => {
    return state.account.staking && state.account.staking.memo;
  });
  const stakingRebase: number = useSelector<IReduxState, number>(state => {
    return state.app.stakingRebase;
  });
  const stakingAPY: number = useSelector<IReduxState, number>(state => {
    return state.app.stakingAPY;
  });
  const stakingTVL: number = useSelector<IReduxState, number>(state => {
    return state.app.stakingTVL;
  });
  const pendingTransactions: IPendingTxn[] = useSelector<IReduxState, IPendingTxn[]>(state => {
    return state.pendingTransactions;
  });
  
  const setMax = (): void => {
    if (view === 0) {
      setQuantity(timeBalance);
    } else {
      setQuantity(memoBalance);
    }
  };
  
  const onSeekApproval = async (token: string): Promise<void> => {
    if (await checkWrongNetwork()) return;
    
    await dispatch(changeApproval({ address, token, provider, networkID: chainID }));
  };
  
  const onChangeStake = async (action: string): Promise<void> => {
    if (await checkWrongNetwork()) return;
    if (quantity === '' || parseFloat(quantity) === 0) {
      dispatch(warning({ text: action === 'stake' ? messages.before_stake : messages.before_unstake }));
    } else {
      await dispatch(changeStake({ address, action, value: String(quantity), provider, networkID: chainID }));
      setQuantity('');
    }
  };
  
  const hasAllowance = useCallback(
    token => {
      if (token === 'time') return stakeAllowance > 0;
      if (token === 'memo') return unstakeAllowance > 0;
      return 0;
    },
    [stakeAllowance],
  );
  
  const changeView = (newView: number) => (): void => {
    setView(newView);
    setQuantity('');
  };
  
  const trimmedMemoBalance: string = trim(Number(memoBalance), 6);
  const trimmedStakingAPY: string = trim(stakingAPY * 100, 1);
  const stakingRebasePercentage: string = trim(stakingRebase * 100, 4);
  const nextRewardValue: string = trim((
    Number(stakingRebasePercentage) / 100) * Number(trimmedMemoBalance),
    6
  );
  
  const onRenderConnectButton = (): ReactNode => {
    let layout: ReactNode = null;
    
    if (!address) {
      layout = (
        <div className="stake__wallet">
          <div className="stake__wallet__btn" onClick={connect}>
            <p>{'Connect Wallet'}</p>
          </div>
          <p className="stake__wallet__description">{'Connect your wallet to stake TIME tokens!'}</p>
        </div>
      );
    }
    
    return layout;
  };
  
  const onRenderForm = (): ReactNode => {
    let layout: ReactNode = null;
  
    if (!!address) {
      layout = (
        <div className="stake__form__wrap">
          <div className='field'>
            <div className='field__inner'>
              <OutlinedInput
                type="number"
                labelWidth={0}
                className="input__wrapper"
                value={quantity}
                placeholder="Amount"
                inputProps={{
                  className: "input",
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <div onClick={setMax} className="input__btn">
                      <p>Max</p>
                    </div>
                  </InputAdornment>
                }
                onChange={e => setQuantity(e.target.value)}
              />
              {onRenderFormButton()}
            </div>
            {address
              && ((!hasAllowance('time') && view === 0) || (!hasAllowance('memo') && view === 1))
              && (
                <p className='field__description'>
                  Note: The "Approve" transaction is only needed when staking/unstaking for the first time; subsequent
                  staking/unstaking only requires you to perform the "Stake" or "Unstake" transaction.
                </p>
              )
            }
          </div>
        </div>
      );
    }
  
    return layout;
  };
  
  const onRenderFormButton = (): ReactElement => {
    return (
      <div className="field__action">
        {view === 0 && (
          <>
            {address && hasAllowance('time')
              ? (
                <div
                  className="field__action__btn"
                  onClick={() => {
                    if (isPendingTxn(pendingTransactions, 'staking')) return;
                    onChangeStake('stake');
                  }}
                >
                  <span>{txnButtonText(pendingTransactions, 'staking', 'Stake TIME')}</span>
                </div>
              )
              : (
                <div
                  className="field__action__btn"
                  onClick={() => {
                    if (isPendingTxn(pendingTransactions, 'approve_staking')) return;
                    onSeekApproval('time');
                  }}
                >
                  <span>{txnButtonText(pendingTransactions, 'approve_staking', 'Approve')}</span>
                </div>
              )
            }
          </>
        )}
        {view === 1 && (
          <>
            {address && hasAllowance('memo')
              ? (
                <div
                  className="field__action__btn"
                  onClick={() => {
                    if (isPendingTxn(pendingTransactions, 'unstaking')) return;
                    onChangeStake('unstake');
                  }}
                >
                  <span>{txnButtonText(pendingTransactions, 'unstaking', 'Unstake TIME')}</span>
                </div>
              )
              : (
                <div
                  className="field__action__btn"
                  onClick={() => {
                    if (isPendingTxn(pendingTransactions, 'approve_unstaking')) return;
                    onSeekApproval('memo');
                  }}
                >
                  <span>{txnButtonText(pendingTransactions, 'approve_unstaking', 'Approve')}</span>
                </div>
              )
            }
          </>
        )}
      </div>
    );
  };
  
  const onRenderUserData = (): ReactNode => {
    let layout: ReactNode = null;
    
    if (!!address) {
      layout = (
        <div className='stake__user__data'>
          <div className='row'>
            <div className='row__label'>{'Your Balance'}</div>
            <div className='row__value'>
              {isAppLoading
                ? <Skeleton width="80px" />
                : <>{`${trim(Number(timeBalance), 4)} Token`}</>
              }
            </div>
          </div>
          <div className='row'>
            <div className='row__label'>{'Your Staked Balance'}</div>
            <div className='row__value'>
              {isAppLoading ? <Skeleton width="80px" /> : <>{`${trimmedMemoBalance} Token`}</>}
            </div>
          </div>
          <div className='row'>
            <div className='row__label'>{'Wrapped Balance'}</div>
            <div className='row__value'>
              <Skeleton width="80px" /> {/* getSide().wrapTokenType */}
            </div>
          </div>
          <div className='row'>
            <div className='row__label'>{'Exchange rate'}</div>
            <div className='row__value'>
              <Skeleton width="80px" />
            </div>
          </div>
          <div className='row'>
            <div className='row__label'>{'Next Reward Amount'}</div>
            <div className='row__value'>
              {isAppLoading ? <Skeleton width="80px" /> : <>{`${nextRewardValue} Token`}</>}
            </div>
          </div>
          <div className='row'>
            <div className='row__label'>{'Next Reward Yield'}</div>
            <div className='row__value'>
              {isAppLoading ? <Skeleton width="80px" /> : <>{stakingRebasePercentage}%</>}
            </div>
          </div>
          <div className='row'>
            <div className='row__label'>{'ROI (5-Day Rate)'}</div>
            <div className='row__value'>
              {isAppLoading ? <Skeleton width="80px" /> : <>{trim(Number(fiveDayRate) * 100, 4)}%</>}
            </div>
          </div>
        </div>
      );
    }
    
    return layout;
  };
  
  return (
    <div className="stake page">
      <h1 className="title">{'JEDI Staking'}</h1>
      <RebaseTimer />
      <Zoom in={true}>
        <div className='stake__container'>
          <Grid
            container
            className="stake__metrics"
            justifyContent="space-between"
          >
            <Grid item className="metrics__card" md={3}>
              <div className="metrics__card__inner">
                <div className="metrics__card__title">{'APY'}</div>
                <div className="metrics__card__value">
                  {stakingAPY
                    ? <>{new Intl.NumberFormat('en-US').format(Number(trimmedStakingAPY))}%</>
                    : <Skeleton width="150px" />}
                </div>
              </div>
            </Grid>
            <Grid item className="metrics__card" md={3}>
              <div className="metrics__card__inner">
                <div className="metrics__card__title">{'TVL'}</div>
                <div className="metrics__card__value">
                  {stakingTVL
                    ? (
                      new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                        minimumFractionDigits: 0,
                      }).format(stakingTVL)
                    )
                    : (
                      <Skeleton width="150px" />
                    )
                  }
                </div>
              </div>
            </Grid>
            <Grid item className="metrics__card" md={3}>
              <div className="metrics__card__inner">
                <div className="metrics__card__title">{'Current Index'}</div>
                <div className="metrics__card__value">
                  {currentIndex ? <>{trim(Number(currentIndex), 2)} TIME</> : <Skeleton width="150px" />}
                </div>
              </div>
            </Grid>
          </Grid>
          <div className='stake__inner'>
            {!!address && (
              <div className="stake__actions">
                <div
                  onClick={changeView(0)}
                  className={cx('stake__actions__btn', { active: !view })}
                >
                  <span>{'Stake'}</span>
                </div>
                <div
                  onClick={changeView(1)}
                  className={cx('stake__actions__btn', { active: view })}
                >
                  <span>{'Unstake'}</span>
                </div>
              </div>
            )}
            
            {onRenderConnectButton()}
  
            {!!address && (
              <div className="stake__content">
                {onRenderForm()}
                {onRenderUserData()}
              </div>
            )}
          </div>
        </div>
      </Zoom>
    </div>
  );
}
