import React, { ReactElement } from 'react';
import { IBlockchain } from '@models/blockchain';
import { getTokenUrl } from '@services/helpers'
import { getBondAddresses } from "@services/helpers/bond/get-bond-addresses";
import { DEFAULT_NETWORK } from "@constants/networks";

import "./styles.scss";
import { useSelector } from 'react-redux';
import { IReduxState } from '@store/slices/state.interface';
import { useCommonContext } from '@services/hooks/network';

export const AddTokens = (): ReactElement => {
  const { getIsEthereumAPIAvailable } = useCommonContext();
  const { chainId } = useSelector((state: IReduxState) => state.network);
  const networkID: number = Number(chainId || DEFAULT_NETWORK.chainId);
  const addresses: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
  const { BIG_ADDRESS, BANG_ADDRESS, DYEL_ADDRESS } = addresses;
  
  const addTokenToWallet = (tokenId: IBlockchain.TokenType, tokenAddress: string) => async () => {
    const tokenImage: string = getTokenUrl(tokenId);
    
    if (getIsEthereumAPIAvailable()) {
      try {
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
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
        <div className="tab" onClick={addTokenToWallet('BIG', BIG_ADDRESS)}>{'BIG'}</div>
        <div className="tab" onClick={addTokenToWallet('BANG', BANG_ADDRESS)}>{'BANG'}</div>
        <div className="tab" onClick={addTokenToWallet('dYel', DYEL_ADDRESS)}>{'dYel'}</div>
      </div>
    </div>
  );
};