import { useSelector } from 'react-redux';
import { Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Zoom } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { trim } from '@services/helpers';
import useBonds, { IAllBondData } from '@services/hooks/bonds';
import { Skeleton } from '@material-ui/lab';
import { IReduxState } from '@store/slices/state.interface';
import { ReactElement } from 'react';
import BondTableRow from './components/row';
import BondDataCard from './components/card';
import { Outlet } from "react-router-dom";

import './styles.scss';

export function Mints(): ReactElement {
  const { bonds } = useBonds();
  const isSmallScreen: boolean = useMediaQuery('(max-width: 733px)'); // change to breakpoint query
  
  const isAppLoading: boolean = useSelector<IReduxState, boolean>(state => state.app.loading);
  const marketPrice: number = useSelector<IReduxState, number>(state => {
    return state.app.marketPrice;
  });
  const treasuryBalance: number = useSelector<IReduxState, number>(state => {
    return state.app.treasuryBalance;
  });
  
  const onRenderMetrics = (): ReactElement => {
    return (
      <Grid
        item
        container
        spacing={2}
        className="mints__metrics"
        justifyContent="space-between"
      >
        <Grid item xs={12} sm={6} className="card">
          <div className='card__inner'>
            <Box textAlign="center">
              <div className="card__title">{'Treasury Balance'}</div>
              <div className="card__value">
                {isAppLoading ? (
                  <Skeleton width="180px" />
                ) : (
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  }).format(treasuryBalance)
                )}
              </div>
            </Box>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className="card">
          <div className='card__inner'>
            <Box textAlign="center">
              <div className="card__title">{`'tokenType'} Price`}</div>
              <div className="card__value">
                {isAppLoading ? <Skeleton width="100px" /> : `$${trim(marketPrice, 2)}`}
              </div>
            </Box>
          </div>
        </Grid>
      </Grid>
    );
  };
  
  return (
    <div className="mints page">
      <Zoom in={true}>
        <div className="mints__wrapper">
          <h1 className='mints__title'>{'Mint (X, X)'}</h1>
          {onRenderMetrics()}
          
          {!isSmallScreen && (
            <Grid container item>
              <TableContainer
                classes={{
                  root: 'mints__table__wrap',
                }}
              >
                <Table className="mints__table">
                  <TableHead className="mints__table__thead">
                    <TableRow  className="mints__table__row">
                      <TableCell className="mints__table__col mint">
                        <span className="mints__table__title">Mint</span>
                      </TableCell>
                      <TableCell className="mints__table__col price">
                        <span className="mints__table__title">Price</span>
                      </TableCell>
                      <TableCell className="mints__table__col ROI">
                        <span className="mints__table__title">ROI</span>
                      </TableCell>
                      <TableCell className="mints__table__col purchased">
                        <span className="mints__table__title">Purchased</span>
                      </TableCell>
                      <TableCell className="mints__table__col action">
                        <span className="mints__table__title">{'Action'}</span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="mints__table__tbody">
                    {bonds.map((bond: IAllBondData): ReactElement => (
                      <BondTableRow key={bond.name} bond={bond} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}
        </div>
      </Zoom>
      
      {isSmallScreen && (
        <div className="mints-view-card-container">
          <Grid container item spacing={2}>
            {bonds.map(bond => (
              <Grid item xs={12} key={bond.name}>
                <BondDataCard key={bond.name} bond={bond} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
      <Outlet /> {/* Bond modal */}
    </div>
  );
}
