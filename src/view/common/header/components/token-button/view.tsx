import React, { MouseEvent, ReactElement, ReactNode, useState } from 'react';
import { Fade, Popper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { ReferenceObject } from 'popper.js';
import WrapButton from './../wrap-button';
import WrapModal from '@view/common/header/components/wrap-modal';
import AddTokens from '@view/common/header/components/add-tokens';

import './styles.scss';

export function TokenButton(): ReactElement {
  const [isActive, toggleModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | ReferenceObject | (() => ReferenceObject)>(null);
  
  const onToggleModal = (event: MouseEvent<HTMLDivElement>, active: boolean): void => {
    setAnchorEl(event.currentTarget);
    toggleModal(active);
  };
  
  const onClose = (): void => {
    setAnchorEl(null)
    toggleModal(false);
  };
  
  return (
    <div
      className={cx('header__token__btn', { active: isActive })}
      onMouseEnter={(e: MouseEvent<HTMLDivElement>): void => onToggleModal(e, true)}
      onMouseLeave={(e: MouseEvent<HTMLDivElement>): void => onToggleModal(e, false)}
    >
      <div className="btn__label">{'dYEL'}</div>
      <Popper
        transition
        open={isActive}
        anchorEl={anchorEl}
        className="header__side__btn__popper"
      >
        {({ TransitionProps }): ReactElement => (
          <Fade {...TransitionProps} timeout={200}>
            <>
              <div className="card main card--custom">
                <Link to="/" className="buy--link">{'Buy on Lorem Ipsum'} </Link>
                <WrapButton />
              </div>
              <AddTokens />
            </>
          </Fade>
        )}
      </Popper>
      <WrapModal onClose={onClose} />
    </div>
  );
}