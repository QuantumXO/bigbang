import React, { ReactElement } from 'react';

import './styles.scss';

interface IProps {
  openWrapModal: () => void;
}

export function WrapButton({ openWrapModal }: IProps): ReactElement {
  return (
    <div onClick={openWrapModal} className="btn--wrap">
      <span className="btn--wrap__label">{'Wrap BANG to dYel'}</span>
    </div>
  );
}