import React, { ReactElement, ReactNode, useState } from 'react';
import { Fade, Popper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import './styles.scss';

interface IToken {
  id: string;
  label: string;
}

export function TokenButton(): ReactElement {
  const [anchorEl, setAnchorEl] = useState(null);
  const isEthereumAPIAvailable = window.ethereum;
  const isOpen: boolean = Boolean(anchorEl);
  
  const handleClick = (event: any): void => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  
  const onRenderSideTokens = (): ReactNode => {
    let layout: ReactNode;
    
    if (isEthereumAPIAvailable) {
      let tokens: IToken[] = [];
      
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
      className={cx(
        'header__side__btn',
        { active: isOpen }
      )}
      onMouseEnter={(e): void => handleClick(e)}
      onMouseLeave={(e): void => handleClick(e)}
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
              {onRenderSideTokens()}
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}