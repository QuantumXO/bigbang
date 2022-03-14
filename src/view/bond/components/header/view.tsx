import { ReactElement, useState } from 'react';
import { NavigateFunction, NavLink, useNavigate } from 'react-router-dom';
import BondLogo from '@view/common/BondLogo';
import Settings from './components/settings';
import { IconButton, SvgIcon, Link } from '@material-ui/core';
import { ReactComponent as SettingsIcon } from '@assets/images/icons/settings.svg';
import { ReactComponent as XIcon } from '@assets/images/icons/x.svg';
import { useEscape } from '@services/hooks';
import { IAllBondData } from '@services/hooks/bonds';
import linkUrl from '@services/common/get-link-url';

import "./styles.scss";

interface IBondHeaderProps {
  bond: IAllBondData;
  slippage: number;
  onSlippageChange: (e: any) => void;
}

export function Header({ bond, slippage, onSlippageChange }: IBondHeaderProps): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const mintsUrl: string = linkUrl().get.mints();
  
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  useEscape((): void => {
    if (open) handleClose();
    else navigate(mintsUrl);
  });

  return (
    <div className="bond__header">
      <div className="settings">
        <IconButton onClick={handleOpen} className="settings__btn">
          <SvgIcon color="primary" component={SettingsIcon} fontSize="large" />
        </IconButton>
        <Settings open={open} handleClose={handleClose} slippage={slippage} onSlippageChange={onSlippageChange} />
      </div>

      <div className="title">
        <BondLogo bond={bond} iconSize={32} />
        <div className="bond__name">
          {bond.displayName}
        </div>
      </div>
      
      <Link component={NavLink} to={mintsUrl} className="close__btn">
        <SvgIcon color="primary" component={XIcon} />
      </Link>
    </div>
  );
}
