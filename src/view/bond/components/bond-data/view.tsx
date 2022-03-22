import React, { ReactElement } from 'react';
import { IBond } from '@models/bond';
import { Slide, Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import './styles.scss';
import cx from 'classnames';

interface IProps {
  data?: IBond.IUserData[];
  isBondLoading?: boolean;
}

export const BondData = ({ data = [], isBondLoading }: IProps): ReactElement => {
  return (
    <Slide direction="right" in mountOnEnter unmountOnExit {...{ timeout: 533 }}>
      <Box className="bond--data card card--custom">
        {data.map(({ id, label, value, isDivided }: IBond.IUserData): ReactElement => {
          return (
           <div className={cx('data__row', { isDivided: isDivided })} key={id}>
            <div className="data__label">{label}</div>
            <div className="data__value">
              {isBondLoading ? <Skeleton width="100px" /> : value}
            </div>
           </div>
          )
        })}
      </Box>
    </Slide>
  );
};