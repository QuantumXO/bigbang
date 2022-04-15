import  React, { ReactElement, Fragment, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { shorten, trim } from '@services/helpers';
import cx from 'classnames';
import linkUrl from '@services/common/get-link-url';
import Socials from '@view/common/sidebar/components/socials';
import useBonds, { IAllBondData } from '@services/hooks/bonds';
import { Skeleton } from '@material-ui/lab';
import { useAddress } from '@services/hooks/network';
import WrapButton from '@view/common/header/components/wrap-button';

import '@view/common/sidebar/styles.scss';

interface IMenuItem {
  id: string;
  url: string;
  label: string;
}

const menu: IMenuItem[] = [
  { id: 'dashboard', url: '/', label: 'dashboard' },
  { id: 'stake', url: linkUrl().get.stake(), label: 'stake' },
  { id: 'mints', url: linkUrl().get.mints(), label: 'mint' },
  { id: 'docs', url: linkUrl().get.docs(), label: 'docs' },
];

export const SidebarContent = (): ReactElement => {
  const address: string = useAddress();
  const { bonds } = useBonds();
  
  const [isHiddenMints, handleHiddenMints] = useState<boolean>(false);
  
  const onRenderMenu = (): ReactElement => {
    return (
      <div className="sidebar__menu">
        {menu.map(({ id, url, label }: IMenuItem): ReactElement => {
          let layout: ReactElement;
          if (id !== 'mints') {
            layout = (
              <NavLink
                to={url}
                className={cx('menu__item menu__item__link', id)}
              >
                <span className="menu__item__label">{label}</span>
              </NavLink>
            );
          } else {
            layout = (
              <div className="menu__item menu__item__with__submenu">
                <NavLink
                  to={url}
                  className={cx('menu__item__link', id)}
                >
                  <span className="menu__item__label">{label}</span>
                </NavLink>
                <span
                  onClick={() => handleHiddenMints(!isHiddenMints)}
                  className={cx('mint--discounts__toggler', { hidden: isHiddenMints })}
                >
                  {'Mint discounts'}
                </span>
                <div className={cx('submenu', { hidden: isHiddenMints })}>
                  {bonds.map((item: IAllBondData): ReactElement => {
                    const { displayName, bond, id: bondId, bondDiscount } = item;
                    return (
                      <NavLink
                        key={bond}
                        to={`${linkUrl().get.mints()}/${bondId}`}
                        className={cx('submenu__item__link', id)}
                      >
                        {!bondDiscount
                          ? <Skeleton variant="text" width={150} />
                          : (
                            <div className="bond">
                              {displayName}
                              <span className="bond-pair-roi">
                                {trim(bondDiscount * 100, 2)}%
                              </span>
                            </div>
                          )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          }
          
          return (
            <Fragment key={id}>
              {layout}
            </Fragment>
          );
        })}
  
        <WrapButton styles={{ width: 'auto', padding: '0 25px', margin: '15px auto 0' }}/>
      </div>
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar--header">
        <Link to="/" className="sidebar--logo" />
        {address && (
          <a
            target="_blank"
            className="wallet--link"
            href={`https://blockscan.com/address/${address}`}
          >
            {shorten(address)}
          </a>
        )}
      </div>
      {onRenderMenu()}
      <Socials styles={{ marginTop: 20 }} />
    </div>
  );
};