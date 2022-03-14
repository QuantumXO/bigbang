import React, { ComponentType, FC, ReactElement } from 'react';
import CommonWrapper from '@view/common/common-wrapper';

interface IProps {
  Component: ComponentType;
}

export const CommonRoute: FC<IProps> = ({ Component }: IProps): ReactElement => {
  return (
    <CommonWrapper>
      <Component />
    </CommonWrapper>
  );
};