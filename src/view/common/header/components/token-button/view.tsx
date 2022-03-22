import React, { MouseEvent, ReactElement, ReactNode, useState } from 'react';
import { Fade, Popper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { ReferenceObject } from 'popper.js';
import WrapButton from './../wrap-button';
import WrapModal from '@view/common/header/components/wrap-button/components/modal';

import './styles.scss';

interface IToken {
  id: string;
  label: string;
}

export function TokenButton(): ReactElement {
  const isEthereumAPIAvailable: boolean = !!window.ethereum;
  
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
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onRenderSideTokens = (): ReactNode => {
    let layout: ReactNode;
    
    if (isEthereumAPIAvailable) {
      const tokens: IToken[] = [];
      
      layout = (
        <div className="add--tokens">
          <div className="add--tokens--title">{'Add token to wallet'}</div>
          {tokens.map(({ id, label }: IToken): ReactElement => {
            return (
              <div
                key={id}
                className="tooltip--item token"
                onClick={undefined}
              >
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      );
    }

    return layout;
  };
  
  return (
    <div
      className={cx('header__side__btn', { active: isOpen })}
      onMouseEnter={(e: MouseEvent<HTMLDivElement> ): void => handleClick(e)}
      onMouseLeave={(e: MouseEvent<HTMLDivElement> ): void => handleClick(e)}
    >
      <div className="btn__label">{'xTOK'}</div>
      <Popper
        transition
        open={isOpen}
        anchorEl={anchorEl}
        className="header__side__btn__popper"
      >
        {({ TransitionProps }): ReactElement => (
          <Fade {...TransitionProps} timeout={200}>
            <div className="tooltip">
              <Link to="/" className="tooltip--item">
                <span>{'Buy on Lorem Ipsum'}</span>
              </Link>
              <WrapButton openWrapModal={onOpenWrapModal}/>
            </div>
          </Fade>
        )}
      </Popper>
      <WrapModal isOpen={isOpenWrapModal} closeWrapModal={() => toggleWrapModal(false)}/>
    </div>
  );
}