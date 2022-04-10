import { TableRow, TableCell } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { IAllBondData } from '@services/hooks/bonds';
import getLinkUrl from '@services/common/get-link-url';
import { ReactElement } from 'react';
import BondLogo from '@view/mints/components/bond-logo';
import { priceUnits, trim } from '@services/helpers';
import { Skeleton } from '@material-ui/lab';

import './styles.scss';

interface IBondProps {
  bond: IAllBondData;
}

export function BondTableRow({ bond }: IBondProps): ReactElement {
  const isBondLoading: boolean = !bond.bondPrice ?? true;
  
  return (
    <TableRow className="bond">
      <TableCell className="bond__col mint">
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div className="bond__logo__wrap">
            <BondLogo bond={bond} iconSize={48} />
          </div>
          <div className="bond__mint">
            <span className="bond__text">{bond.displayName}</span>
            {bond.isLP && (
              <NavLink
                target="_blank"
                to={bond.lpUrl || '/'}
                className="bond__contract__link"
              >
                {'View Contract'}
              </NavLink>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="bond__col price">
        <div className="bond__price bond__text">
          {isBondLoading
            ? <Skeleton width="50px" style={{ display: 'inline-block' }} />
            : (
              <>
                <span className="currency--icon">{priceUnits(bond)}</span>
                {trim(bond.bondPrice, 2)}
              </>
            )
          }
        </div>
      </TableCell>
      <TableCell className="bond__col ROI">
        <div className="bond__ROI bond__text">
          {isBondLoading
            ? <Skeleton width="50px" style={{ display: 'inline-block' }} />
            : `${trim(bond.bondDiscount * 100, 2)}%`
          }
        </div>
      </TableCell>
      <TableCell className="bond__col purchased">
        <div className="bond__purchased bond__text">
          {isBondLoading
            ? <Skeleton width="50px" style={{ display: 'inline-block' }} />
            : `${trim(bond.purchased, 2)} ${bond.displayName}`
            /* : (
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }).format(bond.purchased)
            ) */
          }
        </div>
      </TableCell>
      <TableCell className="bond__col action">
        <NavLink
          to={getLinkUrl().get.bond(bond.id)}
          className="bond__link btn__primary--fulfilled"
        >
          {'Mint'}
        </NavLink>
      </TableCell>
    </TableRow>
  );
}
