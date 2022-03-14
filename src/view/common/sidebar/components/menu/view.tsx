import React, { ReactElement } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { shorten } from '@services/helpers';
import { useAddress } from '@services/hooks';
import cx from 'classnames';
import linkUrl from '@services/common/get-link-url';
import Socials from '@view/common/socials';
import useBonds, { IAllBondData } from '@services/hooks/bonds';
import { Skeleton } from '@material-ui/lab';

import '@view/common/sidebar/styles.scss';

interface IMenuItem {
  id: string;
  url: string;
  label: string;
}

export const SidebarMenu = (): ReactElement => {
  const address = useAddress();
  const { bonds } = useBonds();
  
  const menu: IMenuItem[] = [
    { id: 'dashboard', url: linkUrl().get.dashboard(), label: 'dashboard' },
    { id: 'stake', url: linkUrl().get.stake(), label: 'stake' },
    { id: 'mints', url: linkUrl().get.mints(), label: 'mint' },
    { id: 'calculator', url: linkUrl().get.calculator(), label: 'calculator' },
    { id: 'fund', url: linkUrl().get.fund(), label: 'fund' },
    { id: 'docs', url: linkUrl().get.docs(), label: 'docs' },
  ];
  
  const onRenderMenu = (): ReactElement => {
    return (
      <div className="sidebar__menu">
        {menu.map(({ id, url, label }: IMenuItem): ReactElement => {
          let layout: ReactElement;
          if (id !== 'mints') {
            layout = (
              <NavLink
                to={url}
                key={id}
                className={cx('menu__item menu__item__link', id)}
              >
                <span className="menu__item__label">{label}</span>
              </NavLink>
            );
          } else {
            layout = (
              <div key={id} className="menu__item menu__item__with__submenu">
                <NavLink
                  to={url}
                  className={cx('menu__item__link', id)}
                >
                  <span className="menu__item__label">{label}</span>
                </NavLink>
                <div className='submenu'>
                  {bonds.map(({ displayName, bond, name, bondDiscount }: IAllBondData): ReactElement => {
                    return (
                      <NavLink
                        key={bond}
                        to={`${linkUrl().get.mints()}/${name}`}
                        className={cx('submenu__item__link', id)}
                      >
                        <>
                          {!bondDiscount
                            ? <Skeleton variant="text" width={"150px"} />
                            : displayName
                          }
                        </>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          }
          
          return layout;
        })}
      </div>
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar--header">
        <Link to="/" className="sidebar--logo" />
        {address && (
          <div className="wallet-link">
            <Link to={`https://cchain.explorer.avax.network/address/${address}`} target="_blank">
              <p>{shorten(address)}</p>
            </Link>
          </div>
        )}
      </div>
      {onRenderMenu()}
      <Socials styles={{ marginTop: 48 }} />
    </div>
  );
};