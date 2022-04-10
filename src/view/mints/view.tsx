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

import './styles.scss';

export function Mints(): ReactElement {
  const { bonds } = useBonds();
  const isSmallScreen: boolean = useMediaQuery('(max-width: 1024px)'); // change to breakpoint query
  
  const isAppLoading: boolean = useSelector<IReduxState, boolean>(state => state.app.loading);
  const marketPrice: number = useSelector<IReduxState, number>(state => {
    return state.app.marketPrice;
  });
  const treasuryBalance: number = useSelector<IReduxState, number>(state => {
    return state.app.treasuryBalance;
  });
  
  const onRenderMainCards = (): ReactElement => {
    return (
      <Grid
        item
        container
        className="mints__main--cards"
        justifyContent="space-between"
      >
        <Grid item xs={12} sm={6} className="card welcome">
          <div className='card__inner'>
            <div className="card__title">{'Mint'}</div>
            <p className="card__value">
              {'The Mint page allow users to mint BIG from the protocol \n' +
                'at a discount by trading it with i) liquidity (LP tokens) or ii) other assets'}
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className="card card--custom info">
          <div className='card__inner'>
            <span className="card__icon" />
            <p className="card__text">
              {'The minting action create bonds which take roughly XX epochs to vest, and BIG tokens are vested linearly \n' +
                'to the user over that period'}
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className="card metric">
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
        <Grid item xs={12} sm={6} className="card metric">
          <div className='card__inner'>
            <Box textAlign="center">
              <div className="card__title">{`BIG Price`}</div>
              <div className="card__value">
                {isAppLoading ? <Skeleton width="100px" /> : `$${trim(marketPrice, 2)}`}
              </div>
            </Box>
          </div>
        </Grid>
      </Grid>
    );
  };
  
  const onRenderBondsTable = (): ReactElement | null => {
    let layout: ReactElement | null = null;
    
    if (!isSmallScreen) {
      layout = (
        <Grid container item className="card card--custom bonds">
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
                    <span className="mints__table__title">Discount</span>
                  </TableCell>
                  <TableCell className="mints__table__col purchased">
                    <span className="mints__table__title">Purchased</span>
                  </TableCell>
                  <TableCell className="mints__table__col action">
                    <span className="mints__table__title" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="mints__table__tbody">
                {bonds.map((bond: IAllBondData): ReactElement => (
                  <BondTableRow key={bond.id} bond={bond} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      );
    }
    
    return layout;
  }
  
  const onRenderBondsCards = (): ReactElement | null => {
    let layout: ReactElement | null = null;
  
    if (isSmallScreen) {
      layout = (
        <Grid container item spacing={2}>
          {bonds.map((bond) => (
            <Grid item xs={12} key={bond.id}>
              <BondDataCard key={bond.id} bond={bond} />
            </Grid>
          ))}
        </Grid>
      );
    }
    
    return layout;
  }
  
  return (
    <div className="mints page">
      <Zoom in={true}>
        <div className="mints__wrapper">
          {onRenderMainCards()}
  
          {onRenderBondsTable()}
          
          {onRenderBondsCards()}
        </div>
      </Zoom>
    </div>
  );
}
