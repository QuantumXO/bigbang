import React, { ReactElement, useState, MouseEvent } from 'react';
import cx from 'classnames';
import { ACTIVE_NETWORKS } from '@constants/networks';
import { IBlockchain } from '@models/blockchain';
import { Fade, Popper } from '@material-ui/core';

import './styles.scss';
import { useCommonContext } from '@services/hooks/network';
import { useSelector } from 'react-redux';
import { IReduxState } from '@store/slices/state.interface';

export const NetworkButton = (): ReactElement => {
  const { chainId } = useSelector((state: IReduxState) => state.network);
  const { switchNetwork } = useCommonContext();
  const filteredNetworks: IBlockchain.INetwork[] = ACTIVE_NETWORKS
    .filter(({ chainId: networkChainId }: IBlockchain.INetwork) => networkChainId !== String(chainId));
  
  const [anchorEl, setAnchorEl] = useState<any>(null);
  
  const isOpen: boolean = Boolean(anchorEl);
  
  const onToggleNetworksPopUp = (event: MouseEvent<HTMLDivElement>): void => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  
  const onHandleNetwork = async (
    { target: { id } }: MouseEvent<HTMLDivElement> & { target: { id: string } }
  ): Promise<void> => {
    const newNetwork: IBlockchain.INetwork | undefined = ACTIVE_NETWORKS
      .find(({ id: networkId }: IBlockchain.INetwork) => networkId === String(id));
  
    if (newNetwork) {
      await switchNetwork(newNetwork.id);
    }
  };
  
  const onRenderBtnLabel = (): ReactElement => {
    const currentNetwork: IBlockchain.INetwork | undefined = ACTIVE_NETWORKS
    .find(({ chainId: networkChainId }: IBlockchain.INetwork) => networkChainId === String(chainId));
    let btnLabel: string = 'Network';
    let btnClasses: string = '';
    
    if (currentNetwork) {
      const { name, id } = currentNetwork;
    
      btnLabel = name;
      btnClasses = id;
    }
    
    return (
      <div className="btn__label">
        <span className="text">{btnLabel}</span>
        <span
          className={cx(
            'network__item current',
            { [btnClasses]: !!btnClasses }
          )}
        />
      </div>
    );
  };
  
  return (
    <div
      className={cx('header__network__btn', { active: isOpen })}
      onMouseEnter={(e: MouseEvent<HTMLDivElement>): void => onToggleNetworksPopUp(e)}
      onMouseLeave={(e: MouseEvent<HTMLDivElement>): void => onToggleNetworksPopUp(e)}
    >
      {onRenderBtnLabel()}
      <Popper
        transition
        open={isOpen}
        anchorEl={anchorEl}
        className="header__network__btn__popper"
      >
        {({ TransitionProps }): ReactElement => (
          <Fade {...TransitionProps} timeout={200}>
            <div className="networks__list">
              {filteredNetworks.map((item: IBlockchain.INetwork): ReactElement => {
                const { id } = item;
                return (
                  <div
                    id={id}
                    key={id}
                    className={cx('network__item', { [id]: !!id })}
                    onClick={onHandleNetwork}
                  />
                )
              })}
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
};