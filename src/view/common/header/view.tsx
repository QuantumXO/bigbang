import React, { ReactElement } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ConnectButton from './components/connect-button';
import NetworkButton from './components/network-button';
import cx from 'classnames';
import { DRAWER_WIDTH, TRANSITION_DURATION } from '@constants/style';
import TokenButton from '@view/common/header/components/token-button';

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

export function Header({ drawe, handleSidebarToggle }: IHeader): ReactElement {
  const classes = useStyles();
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
          <span onClick={handleSidebarToggle} className="btn--toggle--sidebar" />
          <div className="toolbar-btns-wrap">
            <TokenButton />
            <ConnectButton />
            <NetworkButton />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
