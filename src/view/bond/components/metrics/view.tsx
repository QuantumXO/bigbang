import { ReactElement } from 'react';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useSelector } from "react-redux";
import { IReduxState } from "@store/slices/state.interface";
import { IAllBondData } from '@services/hooks/bonds';
import { IAppSlice } from '@store/slices/app-slice';
import { trim } from '@services/helpers';

import "./styles.scss";

interface IProps {
  bond: IAllBondData;
}

export function Metrics({ bond }: IProps): ReactElement {
  const isBondLoading: boolean = useSelector<IReduxState, boolean>(state => state.bonding.loading ?? true);
  const app: IAppSlice = useSelector<IReduxState, IAppSlice>(state => state.app);
  
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
            {!isBondLoading
              ? <>{`$${trim(bond.bondPrice, 2)}`}</>
              : <Skeleton width="150px" />}
          </div>
        </div>
      </Grid>
  
      <Grid item className="metrics__card" md={3}>
        <div className="metrics__card__inner">
          <div className="metrics__card__title">{'BIG Price'}</div>
          <div className="metrics__card__value">
            {!isBondLoading
              ? <>{`$${trim(app.marketPrice, 2)}`}</>
              : <Skeleton width="150px" />}
          </div>
        </div>
      </Grid>
  
      <Grid item className="metrics__card" md={3}>
        <div className="metrics__card__inner">
          <div className="metrics__card__title">{`dYEL`}</div>
          <div className="metrics__card__value">
            {!isBondLoading
              ? <>{`$${app.dYelPrice}`}</>
              : <Skeleton width="150px" />}
          </div>
        </div>
      </Grid>
    </Grid>
  );
}