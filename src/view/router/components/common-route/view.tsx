import React,
{ ComponentType, FC, ReactElement, ReactNode, Children, isValidElement, cloneElement, ReactChildren, memo }
  from 'react';
import CommonWrapper from '@view/common/common-wrapper';

interface IProps {
  Component?: ComponentType;
  props?: Record<string, any>;
  children?: ReactNode;
}

export const CommonRoute: FC<IProps> = memo(({ Component, props = {}, children }: IProps): ReactElement => {
  let childrenWithProps: Record<string, unknown>[] | null | undefined = null;
  
  if (!!children) {
    childrenWithProps = Children.map(children, child => {
      if (isValidElement(child)) {
        return cloneElement(child, { ...props });
      }
      return child;
    });
  }
  
  
  return (
    <CommonWrapper>
      {Component && <Component {...props} />}
      {childrenWithProps}
    </CommonWrapper>
  );
});