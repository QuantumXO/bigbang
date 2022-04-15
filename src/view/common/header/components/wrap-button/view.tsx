import React, { CSSProperties, ReactElement } from 'react';
import { useCommonContext } from '@services/hooks/network';

import './styles.scss';

interface IProps {
  styles?: CSSProperties;
}

export function WrapButton({ styles = {} }: IProps): ReactElement {
  const { toggleWrapModal } = useCommonContext()
  return (
    <div style={styles} onClick={() => toggleWrapModal(true)} className="btn--wrap">
      <span className="btn--wrap__label">{'Wrap BANG to dYel'}</span>
    </div>
  );
}