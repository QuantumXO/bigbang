import React, { ReactElement, useState } from 'react';
import cx from 'classnames';
import { Fade, Popper } from '@material-ui/core';
// import { switchNetwork } from '@services/helpers/switch-network';

import './styles.scss';

interface INetwork {
  id: string;
  label: string;
}

const networks: INetwork[] = [
  { id: 'ethereum', label: 'Ethereum' },
  { id: 'subtrack', label: 'Subtrack' },
  { id: 'network3', label: 'Network3' },
  { id: 'network4', label: 'Network4' },
];

export const NetworkButton = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isEthereumAPIAvailable = window.ethereum;
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
              {networks.map((item: INetwork): ReactElement => {
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