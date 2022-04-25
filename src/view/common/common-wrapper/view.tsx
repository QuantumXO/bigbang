import React, { FC, memo, ReactElement, useState } from 'react';
import Header from '../header';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { DRAWER_WIDTH, TRANSITION_DURATION } from '@constants/style';
import Messages from '../messages';
import Sidebar from '@view/common/sidebar';
import cx from 'classnames';

import '@view/common/common-wrapper/styles.scss';
import { useSelector } from 'react-redux';
import { IReduxState } from '@store/slices/state.interface';
import Loader from '@view/common/loader';
import { useCommonContext } from '@services/hooks/network';

interface IProps {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  content: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: TRANSITION_DURATION,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: TRANSITION_DURATION,
    }),
    marginLeft: 0,
  },
}));

export const CommonWrapper: FC<IProps> = memo(({ children }: IProps): ReactElement  => {
  const isAppLoading: boolean = useSelector<IReduxState, boolean>(state => state.app.loading);
  const { isLoadingTokensPrices } = useCommonContext();
  const classes = useStyles();
  const isSmallerScreen = useMediaQuery('(max-width: 960px)');
  
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  
  const handleDrawerToggle = (): void => setMobileOpen(!mobileOpen);
  
  return (
    <div className={cx('wrapper--common')}>
      {(isAppLoading || isLoadingTokensPrices)
        ? <Loader />
        : (
          <>
            <Messages />
            <Header drawe={!isSmallerScreen} handleSidebarToggle={handleDrawerToggle} />
            <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            <div
              className={cx(
                'wrapper--common__container',
                classes.content,
                { [classes.contentShift]: isSmallerScreen }
              )}
            >
              <div className="wrapper--common__content">
                {children}
              </div>
            </div>
          </>
        )
      }
    </div>
  );
});