import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

export function Header(): ReactElement {
  return (
    <div className="bond__header card card--custom">
      <div className="bond__name">{'Reverse bonding'}</div>
      <NavLink to="/" className="back__link" children={null} />
    </div>
  );
}
