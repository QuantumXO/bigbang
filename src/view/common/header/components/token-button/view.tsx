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
  const [anchorEl, setAnchorEl] = useState<null | ReferenceObject | (() => ReferenceObject)>(null);
  const [isOpenWrapModal, toggleWrapModal] = useState<boolean>(false);
  
  const isOpen: boolean = Boolean(anchorEl);
  
  const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  
  const onOpenWrapModal = (): void => {
    toggleWrapModal(true);
    setAnchorEl(null);
  };
  
  return (
    <div
      className={cx('header__token__btn', { active: isOpen })}
      onMouseEnter={(e: MouseEvent<HTMLDivElement> ): void => handleClick(e)}
      onMouseLeave={(e: MouseEvent<HTMLDivElement> ): void => handleClick(e)}
    >
      <div className="btn__label">{'dYEL'}</div>
      <Popper
        transition
        open={isOpen}
        anchorEl={anchorEl}
        className="header__side__btn__popper"
      >
        {({ TransitionProps }): ReactElement => (
          <Fade {...TransitionProps} timeout={200}>
            <>
              <div className="card main card--custom">
                <Link to="/" className="buy--link">{'Buy on Lorem Ipsum'} </Link>
                <WrapButton openWrapModal={onOpenWrapModal}/>
              </div>
              <AddTokens />
            </>
          </Fade>
        )}
      </Popper>
      <WrapModal isOpen={isOpenWrapModal} closeWrapModal={() => toggleWrapModal(false)}/>
    </div>
  );
}