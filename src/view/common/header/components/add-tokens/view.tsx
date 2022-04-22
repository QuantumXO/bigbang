import React, { ReactElement } from 'react';
import { IBlockchain } from '@models/blockchain';
import { getTokenUrl } from '@services/helpers'
import { getBondAddresses } from '@services/common/bond/get-bond-addresses';
import { useSelector } from 'react-redux';
import { IReduxState } from '@store/slices/state.interface';
import { useCommonContext } from '@services/hooks/network';

import './styles.scss';

export const AddTokens = (): ReactElement => {
  const { getIsEthereumAPIAvailable } = useCommonContext();
  const { chainId } = useSelector((state: IReduxState) => state.network);
  const networkID: number = Number(chainId);
  const { BIG_ADDRESS, BANG_ADDRESS, DYEL_ADDRESS } = getBondAddresses(networkID);
  
  const addTokenToWallet = (tokenId: IBlockchain.TokenType, tokenAddress: string) => async () => {
    const tokenImage: string = getTokenUrl(tokenId);
    
    if (getIsEthereumAPIAvailable()) {
      try {
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenId,
              image: tokenImage,
              decimals: 18,
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  return (
    <div className="add--tokens card card--custom">
      <div className="title">{'ADD TOKEN TO WALLET'}</div>
      <div className="tabs">
        <div
          className="tab"
          onClick={BIG_ADDRESS ? addTokenToWallet('BIG', BIG_ADDRESS) : undefined}
        >
          {'BIG'}
        </div>
        <div
          className="tab"
          onClick={BANG_ADDRESS ? addTokenToWallet('BANG', BANG_ADDRESS) : undefined}
        >
          {'BANG'}
        </div>
        <div
          className="tab"
          onClick={DYEL_ADDRESS ? addTokenToWallet('dYel', DYEL_ADDRESS) : undefined}
        >
          {'dYel'}
        </div>
      </div>
    </div>
  );
};