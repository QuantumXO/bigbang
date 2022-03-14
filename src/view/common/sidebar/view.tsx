import React, { FC, ReactElement } from 'react';
import { Drawer } from '@material-ui/core';
import { Hidden, makeStyles } from '@material-ui/core';
import { DRAWER_WIDTH } from '@constants/style';
import Menu from '@view/common/sidebar/components/menu';
import cx from 'classnames';

export interface IProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export const Sidebar: FC<IProps> = ({ mobileOpen, handleDrawerToggle }: IProps): ReactElement => {
  const classes = useSidebarStyles();
  return (
    <div className={cx(classes.drawer, 'sidebar__wrapper')}>
      <MobileSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <CommonSidebar />
    </div>
  );
};

const useSidebarStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
}));

const useMobileSidebarStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    borderRight: 0,
  },
}));

const CommonSidebar = (): ReactElement => {
  return (
    <Hidden smDown>
      <Drawer
        anchor="left"
        variant="permanent"
        PaperProps={{
          style: {
            border: 'none',
            background: 'var(--primary_color)'
          }
        }}
        classes={{
          paper: cx('sidebar__drawer__paper'),
        }}
      >
        <Menu />
      </Drawer>
    </Hidden>
  );
};

const MobileSidebar = ({ mobileOpen, handleDrawerToggle }: IProps): ReactElement => {
  const classes = useMobileSidebarStyles();
  
  return (
    <Hidden mdUp>
      <Drawer
        anchor="left"
        open={mobileOpen}
        variant="temporary"
        onClose={handleDrawerToggle}
        onClick={handleDrawerToggle}
        classes={{
          paper: cx(classes.drawerPaper, 'sidebar__drawer__paper'),
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Menu />
      </Drawer>
    </Hidden>
  );
};