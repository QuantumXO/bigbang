import React, { ReactElement } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ConnectButton from './components/connect-button';
import WrapButton from './components/wrap-button';
import cx from 'classnames';
import { DRAWER_WIDTH, TRANSITION_DURATION } from '@constants/style';
import SideButton from '@view/common/header/components/side-button';

import './styles.scss';

interface IHeader {
  drawe: boolean;
  handleSidebarToggle: () => void;
}

const useStyles = makeStyles(theme => ({
  header: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: TRANSITION_DURATION,
    }),
    marginLeft: DRAWER_WIDTH,
  },
  appBar: {
    [theme.breakpoints.up('sm'  )]: {
      width: '100%',
      padding: '58px 0 20px 0',
    },
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    background: 'transparent',
    backdropFilter: 'none',
    zIndex: 10,
  },
  topBarShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: TRANSITION_DURATION,
    }),
    marginLeft: 0,
  },
}));

export function Header({ handleSidebarToggle, drawe }: IHeader): ReactElement {
  const classes = useStyles();
  const isVerySmallScreen: boolean = useMediaQuery('(max-width: 400px)');

  return (
    <div
      className={cx(
        'header',
        classes.header,
        { [classes.topBarShift]: !drawe }
      )}
    >
      <AppBar
        elevation={0}
        position="sticky"
        className={cx(classes.appBar, 'header__appbar')}
      >
        <Toolbar disableGutters className="toolbar">
          <div className="toolbar-btns-wrap">
            {!isVerySmallScreen && <SideButton />}
            {!isVerySmallScreen && <WrapButton />}
            <ConnectButton />
          </div>
          <span
            onClick={handleSidebarToggle}
            className="btn--toggle--sidebar"
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}
