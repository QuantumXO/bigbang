import React, { ReactElement } from 'react';
import cx from 'classnames';

import './styles.scss';

interface IProps {
  activeTabIndex: number
  handleChangeView: () => void;
}

export const Togglers = ({ handleChangeView, activeTabIndex }: IProps): ReactElement => {
  const isActiveMintTab: boolean = activeTabIndex === 0;
  const isActiveRedeemTab: boolean = !isActiveMintTab;
  return (
    <div className="bond__togglers">
      <div
        className={cx('bond__togglers__btn', { active: isActiveMintTab })}
        onClick={!isActiveMintTab ? handleChangeView : undefined}
      >
        {'Mint'}
      </div>
      <div
        className={cx('bond__togglers__btn', { active: isActiveRedeemTab })}
        onClick={!isActiveRedeemTab ? handleChangeView : undefined}
      >
        {'Redeem'}
      </div>
    </div>
  );
};