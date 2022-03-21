import { ReactElement } from 'react';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import "./styles.scss";

export function Metrics(): ReactElement {
  const mintPrice: number = 0;
  const wrapTokenPrice: number = 28796.91;
  const tokenPrice: number = 405.61;
  
  return (
    <Grid
      container
      className="metrics card card--custom"
      justifyContent="space-around"
    >
      <Grid item className="metrics__card" md={3}>
        <div className="metrics__card__inner">
          <div className="metrics__card__title">{'Mint Price'}</div>
          <div className="metrics__card__value">
            {mintPrice
              ? <>{`$${mintPrice}`}</>
              : <Skeleton width="150px" />}
          </div>
        </div>
      </Grid>
  
      <Grid item className="metrics__card" md={3}>
        <div className="metrics__card__inner">
          <div className="metrics__card__title">{'BIG Price'}</div>
          <div className="metrics__card__value">
            {wrapTokenPrice
              ? <>{`$${wrapTokenPrice}`}</>
              : <Skeleton width="150px" />}
          </div>
        </div>
      </Grid>
  
      <Grid item className="metrics__card" md={3}>
        <div className="metrics__card__inner">
          <div className="metrics__card__title">{`xTOK`}</div>
          <div className="metrics__card__value">
            {tokenPrice
              ? <>{`$${tokenPrice}`}</>
              : <Skeleton width="150px" />}
          </div>
        </div>
      </Grid>
    </Grid>
  );
}