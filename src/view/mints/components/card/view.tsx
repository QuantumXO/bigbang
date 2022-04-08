import { priceUnits, trim } from '@services/helpers';
import BondLogo from '@view/mints/components/bond-logo';
import { Slide, Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import { IAllBondData } from '@services/hooks/bonds';
import linkUrl from '@services/common/get-link-url';
import { ReactElement } from 'react';

import './styles.scss';

interface IBondProps {
  bond: IAllBondData;
}

export function BondDataCard({ bond }: IBondProps): ReactElement {
  const mintsUrl: string = linkUrl().get.mints();
  const isBondLoading = !bond.bondPrice ?? true;
  
  return (
    <Slide direction="up" in={true}>
      <div className="card bond__card">
        <div className="name">
          <BondLogo bond={bond} iconSize={36} />
          <div className="inner">
            <span className="label">{bond.displayName}</span>
            {bond.isLP && (
              <Link
                href={bond.lpUrl}
                target="_blank"
                className="contract--link"
              >
                View Contract
              </Link>
            )}
            <Link
              href={bond.lpUrl}
              target="_blank"
              className="contract--link"
            >
              View Contract
            </Link>
          </div>
        </div>
        <div className="data">
          <div className="data__row">
            <span className="data__row__label">Price</span>
            <div className="data__row__value">
              {isBondLoading
                ? <Skeleton width="50px" />
                : `${priceUnits(bond)} ${trim(bond.bondPrice, 2)}`
              }
            </div>
          </div>
          <div className="data__row">
            <span className="data__row__label">ROI</span>
            <div className="data__row__value">
              {isBondLoading ? <Skeleton width="50px" /> : `${trim(bond.bondDiscount * 100, 2)}%`}
            </div>
          </div>
          <div className="data__row">
            <span className="data__row__label">Purchased</span>
            <div className="data__row__value">
              {isBondLoading
                ? <Skeleton width="80px" />
                : (
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  }).format(bond.purchased)
                )
              }
            </div>
          </div>
        </div>
        <NavLink
          to={`${mintsUrl}/${bond.id}`}
          className="mint__link btn__primary--fulfilled"
        >
          Mint {bond.displayName}
        </NavLink>
      </div>
    </Slide>
  );
}