import {
  Box, Modal, Paper, SvgIcon, IconButton, FormControl, OutlinedInput, InputLabel, InputAdornment
} from '@material-ui/core';
import { ReactElement, useEffect, useState } from 'react';
import { ReactComponent as XIcon } from '@assets/images/icons/x.svg';

import './styles.scss';

interface IAdvancedSettingsProps {
  open: boolean;
  handleClose: () => void;
  slippage: number;
  onSlippageChange: (e: any) => void;
}

export function Settings({ open, handleClose, slippage, onSlippageChange }: IAdvancedSettingsProps): ReactElement {
  const [value, setValue] = useState<number>(slippage);

  useEffect(() => {
    let timeout: any = null;

    timeout = setTimeout(() => onSlippageChange(value), 1000);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Modal
      id="hades"
      open={open}
      onClose={handleClose}
      className="bond settings__modal"
    >
      <Paper className="wrapper">
        <div className='header'>
          <p className="header__title">Settings</p>
          <IconButton onClick={handleClose} className="close__btn">
            <SvgIcon color="primary" component={XIcon} />
          </IconButton>
        </div>
        <Box className="container">
          <InputLabel htmlFor="slippage" className="input__label">{'Slippage'}</InputLabel>
          <OutlinedInput
            fullWidth
            id="slippage"
            value={value}
            type="number"
            inputProps={{
              className: "input",
            }}
            className="input__wrapper"
            endAdornment={
              <InputAdornment position="end">
                <span className="percent">%</span>
              </InputAdornment>
            }
            onChange={(e: any) => setValue(e.target.value)}
          />
          <div className="description">
            {'Transaction may revert if price changes by more than slippage %'}
          </div>
        </Box>
      </Paper>
    </Modal>
  );
}
