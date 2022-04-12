import React, { useState, useCallback, ReactElement, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, InputAdornment, OutlinedInput, Zoom, Slider } from '@material-ui/core';
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
import network from '@services/common/network';

const stakeSliderMarks = [
  { value: 0, label: '0%' },
  { value: 25, label: '25%' },
  { value: 50, label: '50%' },
  { value: 75, label: '75%' },
  { value: 100, label: '100%' },
];

export function Stake(): ReactElement {
  const dispatch = useDispatch();
  const { provider, address, connect, chainID } = useWeb3Context();
  
  const [view, setView] = useState(0);
  const [quantity, setQuantity] = useState<string>('');
  
  const isAppLoading: boolean = useSelector<IReduxState, boolean>(state => state.app.loading);
  const currentIndex: string = useSelector<IReduxState, string>(state => {
    return state.app.currentIndex;
  });
  const fiveDayRate: number = useSelector<IReduxState, number>(state => {
    return state.app.fiveDayRate;
  });
  const bigBalance: string = useSelector<IReduxState, string>(state => {
    return state.account.balances && state.account.balances.big;
  });
  const bangBalance: string = useSelector<IReduxState, string>(state => {
    return state.account.balances && state.account.balances.bang;
  });
  const stakeAllowance: number = useSelector<IReduxState, number>(state => {
    return state.account.staking && state.account.staking.big;
  });
  const unstakeAllowance: number = useSelector<IReduxState, number>(state => {
    return state.account.staking && state.account.staking.bang;
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
  
  const trimmedBangBalance: string = trim(Number(bangBalance), 9);
  const trimmedStakingAPY: string = trim(stakingAPY * 100, 1);
  const stakingRebasePercentage: string = trim(stakingRebase * 100, 4);
  const nextRewardValue: string = trim((
    Number(stakingRebasePercentage) / 100) * Number(trimmedBangBalance),
    6
  );
  
  const setMax = (): void => {
    if (view === 0) {
      setQuantity(bigBalance);
    } else {
      setQuantity(bangBalance);
    }
  };
  
  const onSeekApproval = async (token: 'big' | 'bang'): Promise<void> => {
    if (await network().getIsWrongNetwork) return;
    
    await dispatch(changeApproval({ address, token, provider, networkID: chainID }));
  };
  
  const onChangeStake = async (action: string): Promise<void> => {
    if (await network().getIsWrongNetwork) return;
    if (quantity === '' || parseFloat(quantity) === 0) {
      dispatch(warning({ text: action === 'stake' ? messages.before_stake : messages.before_unstake }));
    } else {
      await dispatch(changeStake({ address, action, value: String(quantity), provider, networkID: chainID }));
      setQuantity('');
    }
  };
  
  const hasAllowance = useCallback(
    (token: 'big' | 'bang'): boolean | 0 => {
      if (token === 'big') return stakeAllowance > 0;
      if (token === 'bang') return unstakeAllowance > 0;
      return 0;
    },
    [stakeAllowance],
  );
  
  const changeView = (newView: number) => (): void => {
    setView(newView);
    setQuantity('');
  };
  
  const onHandleStakeSlider = (value: number | number[]): void => {
    const maxValue: string = (view === 0) ? bigBalance : bangBalance;
    const newValue: number = (value as number) * Number(maxValue) / 100;
    setQuantity(trim(newValue, 9));
  };
  
  const onRenderConnectButton = (): ReactNode => {
    let layout: ReactNode = null;
    
    if (!address) {
      layout = (
        <div className="stake__wallet">
          <div className="stake__wallet__btn btn__primary--fulfilled" onClick={connect}>
            <span>{'Connect Wallet'}</span>
          </div>
          <p className="stake__wallet__description">
            {'Connect you wallet to stake BIG tokens!'}
          </p>
        </div>
      );
    }
    
    return layout;
  };
  
  const onRenderUserData = (): ReactNode => {
    let layout: ReactNode = null;
    
    if (!!address) {
      layout = (
        <Grid item xs={6} className='stake__user__data card card--custom additional__card'>
          <div className='row'>
            <div className='row__label'>{'Your Balance'}</div>
            <div className='row__value'>
              {isAppLoading
                ? <Skeleton width="80px" />
                : <>{`${trim(Number(bigBalance), 9)} BIG`}</>
              }
            </div>
          </div>
          <div className='row'>
            <div className='row__label'>{'Your Staked Balance'}</div>
            <div className='row__value'>
              {isAppLoading ? <Skeleton width="80px" /> : <>{`${trimmedBangBalance} BANG`}</>}
            </div>
          </div>
          <div className='row divide--top'>
            <div className='row__label'>{'Wrapped Balance'}</div>
            <div className='row__value'>
              {isAppLoading ? <Skeleton width="80px" /> : <>{`0 dYel`}</>}
            </div>
          </div>
          <div className='row exchange--rate'>
            <div className='row__label'>{'Exchange rate'}</div>
            <div className='row__value'>
              <Skeleton width="80px" />
            </div>
          </div>
          <div className='row divide--top'>
            <div className='row__label'>{'Next Reward Amount'}</div>
            <div className='row__value'>
              {isAppLoading ? <Skeleton width="80px" /> : <>{`${nextRewardValue} BANG`}</>}
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
        </Grid>
      );
    }
    
    return layout;
  };
  
  const onRenderStakingFormButton = (): ReactElement => {
    return (
      <div className="field__action">
        {view === 0 && (
          <>
            {address && hasAllowance('big')
              ? (
                <div
                  className="field__action__btn btn__primary--fulfilled"
                  onClick={() => {
                    if (isPendingTxn(pendingTransactions, 'staking')) return;
                    onChangeStake('stake');
                  }}
                >
                  <span>{txnButtonText(pendingTransactions, 'staking', 'Stake BIG')}</span>
                </div>
              )
              : (
                <div
                  className="field__action__btn btn__primary--fulfilled"
                  onClick={() => {
                    if (isPendingTxn(pendingTransactions, 'approve_staking')) return;
                    onSeekApproval('big');
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
            {address && hasAllowance('bang')
              ? (
                <div
                  className="field__action__btn btn__primary--fulfilled"
                  onClick={() => {
                    if (isPendingTxn(pendingTransactions, 'unstaking')) return;
                    onChangeStake('unstake');
                  }}
                >
                  <span>{txnButtonText(pendingTransactions, 'unstaking', 'Unstake BIG')}</span>
                </div>
              )
              : (
                <div
                  className="field__action__btn btn__primary--fulfilled"
                  onClick={() => {
                    if (isPendingTxn(pendingTransactions, 'approve_unstaking')) return;
                    onSeekApproval('bang');
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
  
  const onRenderStakeFormSlider = (): ReactElement => {
    const maxValue: number = (view === 0) ? Number(bigBalance) : Number(bangBalance);
    const value: number = (quantity as unknown as number || 0) * 100 / maxValue;
    
    return (
      <div className="stake__form__slider__wrap">
        <Slider
          min={0}
          max={100}
          // step={25}
          value={value}
          classes={{
            rail: 'rail',
            track: 'track',
            thumb: 'thumb',
            mark: 'mark',
            markLabel: 'mark__label'
          }}
          defaultValue={0}
          className="slider"
          marks={stakeSliderMarks}
          onChange={(e: React.ChangeEvent<Record<string, never>>, newValue: number | number[]) => onHandleStakeSlider(newValue)}
        />
      </div>
    );
  };
  
  const onRenderStakingForm = (): ReactNode => {
    let layout: ReactNode = null;
  
    if (!!address) {
      layout = (
        <div className="stake__form__wrap card card--custom additional__card">
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
          <div className="stake__form">
            <div className='field'>
              <OutlinedInput
                notched
                type="number"
                labelWidth={0}
                value={quantity}
                placeholder="Amount"
                inputProps={{
                  className: "input",
                }}
                className="input__wrapper"
                endAdornment={
                  <InputAdornment position="end">
                    <div onClick={setMax} className="input__btn">
                      <p>Max</p>
                    </div>
                  </InputAdornment>
                }
                onChange={e => setQuantity(e.target.value)}
              />
              {onRenderStakeFormSlider()}
              {address
                && ((!hasAllowance('big') && view === 0) || (!hasAllowance('bang') && view === 1))
                && (
                  <p className='stake__form__description'>
                    Note: The "Approve" transaction is only needed when staking/unstaking for the first time;
                    subsequent staking/unstaking only requires you to perform the "Stake" or "Unstake" transaction.
                  </p>
                )
              }
              {onRenderStakingFormButton()}
            </div>
          </div>
        </div>
      );
    }
  
    return layout;
  };
  
  return (
    <div className="stake page">
      <Zoom in={true}>
        <div>
          <Grid container spacing={0} justifyContent="space-between" className="header__cards__grid">
            <Grid item lg={6} md={6} sm={6} xs={12} className="card stake__card welcome">
              <p className="card__title">{'Stake'}</p>
              <p className="card__value">
                {'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet' +
                  ' sint. Velit officia consequat duis enim velit mollit. Exercitation veniam '}
              </p>
            </Grid>
            <RebaseTimer />
          </Grid>
          <div className="stake__container">
            <div className="stake__container__main card">
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
                      {currentIndex ? `${trim(Number(currentIndex), 2)} BIG` : <Skeleton width="150px" />}
                    </div>
                  </div>
                </Grid>
              </Grid>
              {onRenderConnectButton()}
            </div>
            {!!address && (
              <Grid
                container
                wrap={'nowrap'}
                className="stake__additional"
                justifyContent="space-between"
              >
                {onRenderUserData()}
                {onRenderStakingForm()}
              </Grid>
            )}
          </div>
        </div>
      </Zoom>
    </div>
  );
}
