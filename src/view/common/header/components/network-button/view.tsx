import React, { ReactElement, useState } from 'react';
import cx from 'classnames';
import { NETWORKS } from '@constants/blockchain';
import { IBlockchain } from '@models/blockchain';
import { Fade, Popper } from '@material-ui/core';
import network from '@services/common/network';
// import { switchNetwork } from '@services/helpers/switch-network';

import './styles.scss';

export const NetworkButton = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isEthereumAPIAvailable: boolean = network().getIsEthereumAPIAvailable;
  const isOpen: boolean = Boolean(anchorEl);
  
  const handleClick = (event: any): void => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  
  return (
    <div
      className={cx('header__network__btn', { active: isOpen })}
      onMouseEnter={(e): void => handleClick(e)}
      onMouseLeave={(e): void => handleClick(e)}
    >
      <div className="btn__label">
        <span className="text">{'Ethereum'}</span>
        <span className="network--icon" />
      </div>
      <Popper
        transition
        open={true}
        anchorEl={anchorEl}
        className="header__network__btn__popper"
      >
        {({ TransitionProps }): ReactElement => (
          <Fade {...TransitionProps} timeout={200}>
            <div className="networks__list">
              {NETWORKS.map((item: IBlockchain.INetwork): ReactElement => {
                const { id } = item;
                return (
                  <div key={id} className={cx('networks__list__item', { [id]: !!id })} />
                )
              })}
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
};