import React, { useState } from 'react';
import WrapModal from './components/modal';

import './styles.scss';

export function WrapButton() {
  const [showWrap, setShowWrap] = useState(false);
  
  const handelOpenWrap = (): void => setShowWrap(true);
  
  const handelCloseWrap = (): void => setShowWrap(false);
  
  return (
    <div>
      <div className="btn--wrap" onClick={handelOpenWrap}>
        <span className="btn--wrap__label">{'Wrap'}</span>
      </div>
      <WrapModal open={showWrap} handleClose={handelCloseWrap} />
    </div>
  );
}