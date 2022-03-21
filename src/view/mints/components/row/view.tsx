import { priceUnits, trim } from '@services/helpers';
import BondLogo from '@view/common/BondLogo';
import { TableRow, TableCell, Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import { IAllBondData } from '@services/hooks/bonds';
import getLinkUrl from '@services/common/get-link-url';
import { ReactElement } from 'react';

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
                to={bond.lpUrl || '/'}
                target="_blank"
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
          {`$ 0`}
        </div>
      </TableCell>
      <TableCell className="bond__col ROI">
        <div className="bond__ROI bond__text">
          {`0%`}
        </div>
      </TableCell>
      <TableCell className="bond__col purchased">
        <div className="bond__purchased bond__text">
          {`$ 74,449,163`}
        </div>
      </TableCell>
      <TableCell className="bond__col action">
        <NavLink
          to={getLinkUrl().get.bond(bond.name)}
          className="bond__link btn__primary--fulfilled"
        >
          {'Mint'}
        </NavLink>
      </TableCell>
    </TableRow>
  );
}
