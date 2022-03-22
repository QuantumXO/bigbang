import React, { ReactElement } from 'react';

import './styles.scss';

interface IProps {
  openWrapModal: () => void;
}

export function WrapButton({ openWrapModal }: IProps): ReactElement {
  return (
    <div>
      <div onClick={openWrapModal} className="btn--wrap">
        <span className="btn--wrap__label">{'Wrap'}</span>
      </div>
    </div>
  );
}