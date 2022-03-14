import { priceUnits, trim } from '@services/helpers';
import BondLogo from '@view/common/BondLogo';
import { TableRow, TableCell, Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import { IAllBondData } from '@services/hooks/bonds';

import './styles.scss';
import getLinkUrl from '@services/common/get-link-url';

interface IBondProps {
  bond: IAllBondData;
}

export function BondTableRow({ bond }: IBondProps) {
  const isBondLoading: boolean = !bond.bondPrice ?? true;

  return (
    <TableRow className="bond">
      <TableCell className="bond__col mint">
        <div style={{ display: 'inline-flex' }}>
          <BondLogo bond={bond} iconSize={24} />
          <div className="bond__name">
            <span className="bond__text">{bond.displayName}</span>
            {bond.isLP && (
              <Link color="primary" href={bond.lpUrl} target="_blank">
                <div className="bond__text">View Contract</div>
              </Link>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="bond__col price">
        <div className="bond__price bond__text">
          {isBondLoading
            ? <Skeleton width="50px" />
            : (
              <>
                <span className="currency--icon">{priceUnits(bond)}</span>&nbsp;
                {trim(bond.bondPrice, 2)}
              </>
            )
          }
        </div>
      </TableCell>
      <TableCell className="bond__col ROI">
        <div className="bond__ROI bond__text">
          {isBondLoading ? <Skeleton width="50px" /> : `${trim(bond.bondDiscount * 100, 2)}%`}
        </div>
      </TableCell>
      <TableCell className="bond__col purchased">
        <div className="bond__purchased bond__text">
          {isBondLoading ? (
            <Skeleton width="50px" />
          ) : (
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            }).format(bond.purchased)
          )}
        </div>
      </TableCell>
      <TableCell className="bond__col action">
        <Link component={NavLink} to={getLinkUrl().get.bond(bond.name)} className="bond__link">
          {'Mint'}
        </Link>
      </TableCell>
    </TableRow>
  );
}
