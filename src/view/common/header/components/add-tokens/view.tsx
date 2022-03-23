import React, { ReactElement } from 'react';
import { IBlockchain } from '@models/blockchain';
import { getTokenUrl } from '@services/helpers'
import { useSelector } from "react-redux";
import { getAddresses } from "@constants/addresses";
import { DEFAULT_NETWORK } from "@constants/blockchain";
import { IReduxState } from "@store/slices/state.interface";
import { TOKEN_DECIMALS } from '@constants/blockchain';
import network from '@services/common/network';

import "./styles.scss";

const addTokenToWallet = (tokenId: IBlockchain.TokenType, tokenAddress: string) => async () => {
  const tokenImage: string = getTokenUrl(tokenId);
  
  console.log('addTokenToWallet()');
  
  if (network().getIsEthereumAPIAvailable) {
    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenId,
            image: tokenImage,
            decimals: TOKEN_DECIMALS,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
};


export const AddTokens = (): ReactElement => {
  const networkID = useSelector<IReduxState, number>(state => {
    return (state.app && state.app.networkID) || Number(DEFAULT_NETWORK.chainId);
  });
  
  const addresses: IBlockchain.IBondMainnetAddresses = getAddresses(networkID);
  
  const TIME_ADDRESS: string = addresses.TIME_ADDRESS;
  
  return (
    <div className="add--tokens card card--custom">
      <div className="header">{'ADD TOKEN TO WALLET'}</div>
      <div className="tabs">
        <div className="tab" onClick={() => {
          console.log('click');
          addTokenToWallet('BIG', TIME_ADDRESS);
        }}>{'BIG'}</div>
        <div className="tab" onClick={() => addTokenToWallet('BANG', TIME_ADDRESS)}>{'BANG'}</div>
        <div className="tab" onClick={() => addTokenToWallet('xTOK', TIME_ADDRESS)}>{'xTOK'}</div>
      </div>
    </div>
  );
};