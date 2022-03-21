import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { IAllBondData } from '@services/hooks/bonds';
import linkUrl from '@services/common/get-link-url';

import "./styles.scss";

interface IBondHeaderProps {
  bond: IAllBondData;
}

export function Header({ bond }: IBondHeaderProps): ReactElement {
  const mintsUrl: string = linkUrl().get.mints();

  return (
    <div className="bond__header card card--custom">
      <div className="bond__name">
        {bond.displayName}
      </div>
      <NavLink to={mintsUrl} className="back__link" children={null} />
    </div>
  );
}
