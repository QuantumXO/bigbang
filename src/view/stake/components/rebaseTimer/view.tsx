import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { secondsUntilBlock, prettifySeconds } from '@services/helpers';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { IReduxState } from '@store/slices/state.interface';

import './styles.scss';

export function RebaseTimer(): ReactElement {
  let layout: ReactElement;
  
  const currentBlockTime: number = useSelector<IReduxState, number>(state => {
    return state.app.currentBlockTime;
  });
  const nextRebase: number = useSelector<IReduxState, number>(state => {
    return state.app.nextRebase;
  });

  const timeUntilRebase = useMemo((): number => {
    let result: number = 0;
    if (currentBlockTime && nextRebase) {
      result = secondsUntilBlock(currentBlockTime, nextRebase);
    }
    return result;
  }, [currentBlockTime, nextRebase]);

  if (currentBlockTime) {
    /*
     * (1) nextRebase + currentBlockTime - full time
     * (2) timeUntilRebase * 100 / (nextRebase + currentBlockTime) - percent of left time
     * 100% - (2) -> percent of completed time
     */
    const progressBarWidth: number = 100 - Math.round(timeUntilRebase * 100 / (nextRebase + currentBlockTime));
    layout = (
      <>
        <div className="progress__header">
          <span className="progress__label">{'To Next Rebase:'}</span>
          <span className="progress__time">
            {timeUntilRebase ? prettifySeconds(timeUntilRebase) : 'Rebasing'}
          </span>
        </div>
        <div className="progress__field">
          <div className="progress__bar" style={{ width: `${progressBarWidth}%` }} />
        </div>
      </>
    );
  } else {
    layout = <Skeleton width="200px" />;
  }
  
  return (
    <Grid item lg={6} md={6} sm={6} xs={12} className="card big rebase--timer">
      <p className="card__title" style={{ color: '#AD00FE' }}>BIG Staking</p>
      <div className="rebase--timer__progress">
        {layout}
      </div>
    </Grid>
  );
}
