import { priceUnits, trim } from '@services/helpers';
import BondLogo from '@view/mints/components/bond-logo';
import { Slide, Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import { IAllBondData } from '@services/hooks/bonds';

import './styles.scss';

interface IBondProps {
  bond: IAllBondData;
}

export function BondDataCard({ bond }: IBondProps) {
  const isBondLoading = !bond.bondPrice ?? true;
  return (
    <Slide direction="up" in={true}>
      <div className="card bond__card">
        <div className="name">
          <BondLogo bond={bond} iconSize={36} />
          <div className="inner">
            <p className="label">{bond.displayName}</p>
            {bond.isLP && (
              <div>
                <Link href={bond.lpUrl} target="_blank">
                  <p className="contract--link">View Contract</p>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="data-row">
          <p className="bond-name-title">Price</p>
          <p className="bond-price bond-name-title">
            <>
              {priceUnits(bond)} {isBondLoading ? <Skeleton width="50px" /> : trim(bond.bondPrice, 2)}
            </>
          </p>
        </div>

        <div className="data-row">
          <p className="bond-name-title">ROI</p>
          <p className="bond-name-title">{isBondLoading ? <Skeleton width="50px" /> : `${trim(bond.bondDiscount * 100, 2)}%`}</p>
        </div>

        <div className="data-row">
          <p className="bond-name-title">Purchased</p>
          <p className="bond-name-title">
            {isBondLoading ? (
              <Skeleton width="80px" />
            ) : (
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }).format(bond.purchased)
            )}
          </p>
        </div>
        <Link component={NavLink} to={`/mints/${bond.name}`}>
          <div className="bond-table-btn">
            <p>Mint {bond.displayName}</p>
          </div>
        </Link>
      </div>
    </Slide>
  );
}