import React, { FC, memo, ReactElement } from 'react';
import { Drawer } from '@material-ui/core';
import { Hidden, makeStyles } from '@material-ui/core';
import { DRAWER_WIDTH } from '@constants/style';
import SidebarContent from '@view/common/sidebar/components/menu';
import cx from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export interface IProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export const Sidebar: FC<IProps> = memo(({ mobileOpen, handleDrawerToggle }: IProps): ReactElement => {
  const isDesktop: boolean = useMediaQuery('(min-width: 1024px)');
  const classes = useSidebarStyles();
  return (
    <div className={cx(classes.drawer, 'sidebar__wrapper')}>
      {isDesktop
        ? <CommonSidebar />
        : <MobileSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      }
    </div>
  );
});

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
    <Drawer
      anchor="left"
      variant="permanent"
      PaperProps={{
        style: {
          border: 'none',
          background: '#F2F3F7'
        }
      }}
      classes={{
        paper: cx('sidebar__drawer__paper'),
      }}
    >
      <SidebarContent />
    </Drawer>
  );
};

const MobileSidebar = ({ mobileOpen, handleDrawerToggle }: IProps): ReactElement => {
  const classes = useMobileSidebarStyles();
  return (
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
      <SidebarContent />
    </Drawer>
  );
};