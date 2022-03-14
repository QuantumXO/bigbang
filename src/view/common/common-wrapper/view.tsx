import React, { ReactElement, useState } from 'react';
import Header from '../header';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { DRAWER_WIDTH, TRANSITION_DURATION } from '@constants/style';
import Messages from '../messages';
import Sidebar from '@view/common/sidebar';
import cx from 'classnames';

import '@view/common/common-wrapper/styles.scss';

interface IViewBaseProps {
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
    marginLeft: DRAWER_WIDTH,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: TRANSITION_DURATION,
    }),
    marginLeft: 0,
  },
}));

export function CommonWrapper({ children }: IViewBaseProps): ReactElement {
  const classes = useStyles();
  const isSmallerScreen = useMediaQuery('(max-width: 960px)');
  
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  
  const handleDrawerToggle = (): void => setMobileOpen(!mobileOpen);
  
  return (
    <div className={cx('wrapper--common')}>
      <div className='wrapper--common__inner'>
        <Messages />
        <Header drawe={!isSmallerScreen} handleSidebarToggle={handleDrawerToggle} />
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <div
          className={cx(
            'wrapper--common__content',
            classes.content,
            { [classes.contentShift]: isSmallerScreen }
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}