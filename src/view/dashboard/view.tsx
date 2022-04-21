import React, { ReactElement, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Zoom } from '@material-ui/core';
import { trim } from '@services/helpers';
import { Skeleton } from '@material-ui/lab';
import { IReduxState } from '@store/slices/state.interface';
import { IAppSlice } from '@store/slices/app-slice';
import cx from 'classnames';

import './styles.scss';

interface ICard {
  id: string;
  title: string;
  classes?: string;
  children?: ReactNode;
}

const getDashboardCard = ({ children, title, classes = '' }: ICard): ReactElement => {
  return (
    <Grid
      item
      lg={6}
      md={6}
      sm={6}
      xs={12}
      className={cx('dashboard__card__wrapper', { [classes]: !!classes })}
    >
      <div className="dashboard__card__inner">
        <p className="card__title">{title}</p>
        <p className="card__value">{children}</p>
      </div>
    </Grid>
  );
};

export function Dashboard(): ReactElement {
  const isAppLoading: boolean = useSelector<IReduxState, boolean>(state => state.app.loading);
  const app: IAppSlice = useSelector<IReduxState, IAppSlice>(state => state.app);
  
  const trimmedStakingAPY: string = trim(app.stakingAPY * 100, 1);
  
  const cardsLayout: ReactElement = (
    <>
      {getDashboardCard({
        classes: 'big',
        id: 'treasuryBalance',
        title: 'Treasury Balance',
        children: (
          <>
            {isAppLoading
              ? <Skeleton width="250px" />
              : (
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                }).format(app.treasuryBalance)
              )
            }
          </>
        )
      })}
      {getDashboardCard({
        id: 'bigPrice',
        title: 'BIG Price',
        children: (
          <>
            {isAppLoading ? <Skeleton width="100px" /> : `$${trim(app.marketPrice, 2)}`}
          </>
        )
      })}
      {getDashboardCard({
        id: 'dYELPrice',
        title: 'dYEL Price',
        children: (
          <>
            {isAppLoading ? <Skeleton width="100px" /> : `$${trim(app.dYelPrice, 4)}`}
          </>
        )
      })}
      {getDashboardCard({
        id: 'tvl',
        title: 'TVL',
        children: (
          <>
            {isAppLoading ? (
              <Skeleton width="250px" />
            ) : (
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }).format(app.stakingTVL)
            )}
          </>
        )
      })}
      {getDashboardCard({
        id: 'apy',
        title: 'APY',
        children: (
          <>
            {isAppLoading
              ? <Skeleton width="250px" />
              : `${new Intl.NumberFormat('en-US').format(Number(trimmedStakingAPY))}%`
            }
          </>
        )
      })}
      {getDashboardCard({
        id: 'marketCap',
        title: 'Market Cap',
        children: (
          <>
            {isAppLoading ? (
              <Skeleton width="160px" />
            ) : (
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }).format(app.marketCap)
            )}
          </>
        )
      })}
      {getDashboardCard({
        id: 'currentIndex',
        title: 'Current Index',
        children: (
          <>
            {isAppLoading ? <Skeleton width="250px" /> : `${trim(Number(app.currentIndex), 2)} BIG`}
          </>
        )
      })}
    </>
  );
  
  return (
    <div className="dashboard page">
      <div className="dashboard--cards">
        <Zoom in={true}>
          <Grid className="dashboard--cards__grid" container spacing={0} justifyContent="space-between">
            <Grid item lg={6} md={6} sm={6} xs={12} className="dashboard__card__wrapper welcome">
              <div className="dashboard__card__inner">
                <p className="card__title">{'Dashboard'}</p>
                <p className="card__value">
                  {'Track different protocol related statistics, which \n' +
                  'are constantly updated to reflect the current protocol status and performance'}
                </p>
              </div>
            </Grid>
            {cardsLayout}
          </Grid>
        </Zoom>
      </div>
    </div>
  );
}