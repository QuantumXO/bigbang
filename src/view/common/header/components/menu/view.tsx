import React, { FC, memo, ReactElement } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cx from 'classnames';

import './styles.scss';

interface IMenuLink {
  id: string;
  label: string;
  url: string;
  icon: ReactElement;
  isActive?: boolean;
}

const menu: IMenuLink[] = [
  { id: 'dYEL', label: 'dYEL', url: 'https://d-yel-finance.vercel.app', isActive: true,
    icon: (
      <svg width="16" className="icon dYEL" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 0.667299V4.00054C16 4.3694 15.7245 4.66676 15.385 4.66676C15.0445 4.66676 14.77 4.36886 14.77 4.00054V2.26188L10.3098 7.77305C10.0908 8.04062 9.7198 8.07583 9.4623 7.85376L6.81571 5.55938L1.05053 11.8045C0.930029 11.935 0.773024 12 0.615519 12C0.458014 12 0.300509 11.935 0.180006 11.8045C-0.0600019 11.545 -0.0600019 11.1225 0.180006 10.8626L6.3337 4.19607C6.5572 3.95559 6.90972 3.93609 7.15472 4.14624L9.77131 6.41462L13.8849 1.33351H12.3084C11.9679 1.33351 11.6939 1.03453 11.6939 0.666757C11.6939 0.297901 11.9694 0 12.3084 0H15.386C15.7245 0.000541639 16 0.298984 16 0.667299Z"
          fill="#5A5A5C"></path>
      </svg>
    )
  },
  { id: 'Equilibrium', label: 'Equilibrium', url: 'https://eq-yel-finance.vercel.app/',
    icon: (
      <svg width="16" height="14" className="icon equilibrium" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.5625 10.6758C12.9115 10.6758 12.3615 11.0948 12.1545 11.6758H3.0625C1.9595 11.6758 1.0625 10.7788 1.0625 9.67578C1.0625 8.57278 1.9595 7.67578 3.0625 7.67578H12.0625C13.7165 7.67578 15.0625 6.32978 15.0625 4.67578C15.0625 3.02178 13.7165 1.67578 12.0625 1.67578H2.9705C2.7635 1.09478 2.2135 0.675781 1.5625 0.675781C0.7355 0.675781 0.0625 1.34878 0.0625 2.17578C0.0625 3.00278 0.7355 3.67578 1.5625 3.67578C2.2135 3.67578 2.7635 3.25678 2.9705 2.67578H12.0625C13.1655 2.67578 14.0625 3.57278 14.0625 4.67578C14.0625 5.77878 13.1655 6.67578 12.0625 6.67578H3.0625C1.4085 6.67578 0.0625 8.02178 0.0625 9.67578C0.0625 11.3298 1.4085 12.6758 3.0625 12.6758H12.1545C12.3615 13.2568 12.9115 13.6758 13.5625 13.6758C14.3895 13.6758 15.0625 13.0028 15.0625 12.1758C15.0625 11.3488 14.3895 10.6758 13.5625 10.6758ZM1.5625 2.67578C1.2865 2.67578 1.0625 2.45178 1.0625 2.17578C1.0625 1.89978 1.2865 1.67578 1.5625 1.67578C1.8385 1.67578 2.0625 1.89978 2.0625 2.17578C2.0625 2.45178 1.8385 2.67578 1.5625 2.67578ZM13.5625 12.6758C13.2865 12.6758 13.0625 12.4518 13.0625 12.1758C13.0625 11.8998 13.2865 11.6758 13.5625 11.6758C13.8385 11.6758 14.0625 11.8998 14.0625 12.1758C14.0625 12.4518 13.8385 12.6758 13.5625 12.6758Z"
          fill="#5A5A5C"></path>
      </svg>
    )
  },
  { id: 'Ecosystem', label: 'Ecosystem', url: 'https://app-yel-finance.vercel.app/',
    icon: (
      <svg className="icon ecosystem" width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.0625 0.424805H15.0625L18.8125 4.1748L10.0625 12.9248L1.3125 4.1748L5.0625 0.424805Z" stroke="#5A5A5C" strokeWidth="0.85" strokeLinecap="round"
              strokeLinejoin="round"></path>
        <path d="M1.3125 4.1748H18.8125" stroke="#5A5A5C" strokeWidth="0.85" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M8.8125 0.424805L6.3125 4.1748L10.0625 12.9248L13.8125 4.1748L11.3125 0.424805" stroke="#5A5A5C" strokeWidth="0.85" strokeLinecap="round"
              strokeLinejoin="round"></path>
      </svg>
    )
  },
];

export const Menu: FC = memo((): ReactElement | null => {
  const isSmallScreen: boolean = useMediaQuery('(max-width: 1180px)');
  let layout: ReactElement | null = null;
  
  if (!isSmallScreen) {
    layout = (
      <div className="header__menu">
        {menu.map(({ id, label, icon, url, isActive }: IMenuLink): ReactElement => {
          return (
            <a
              key={id}
              href={url}
              target="_blank"
              className={cx('header__menu__link', { active: isActive })}
            >
              {icon}
              {label}
            </a>
          )
        })}
      </div>
    );
  }
  
  return layout;
});