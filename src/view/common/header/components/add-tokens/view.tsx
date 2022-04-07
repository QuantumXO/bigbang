import React, { ReactElement } from 'react';
import { IBlockchain } from '@models/blockchain';
import { getTokenUrl } from '@services/helpers'
import { getBondAddresses } from "@services/helpers/get-bond-addresses";
import { DEFAULT_NETWORK } from "@constants/blockchain";
import { TOKEN_DECIMALS } from '@constants/blockchain';
import network from '@services/common/network';
import { useWeb3Context } from '@services/hooks';

import "./styles.scss";

const addTokenToWallet = (tokenId: IBlockchain.TokenType, tokenAddress: string) => async () => {
  const tokenImage: string = getTokenUrl(tokenId);
  
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
  const { chainID } = useWeb3Context();
  const networkID: number = Number(chainID || DEFAULT_NETWORK.chainId);
  
  const addresses: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
  
  const { BIG_ADDRESS, BANG_ADDRESS, DYEL_ADDRESS } = addresses;
  
  return (
    <div className="add--tokens card card--custom">
      <div className="header">{'ADD TOKEN TO WALLET'}</div>
      <div className="tabs">
        <div className="tab" onClick={addTokenToWallet('BIG', BIG_ADDRESS)}>{'BIG'}</div>
        <div className="tab" onClick={addTokenToWallet('BANG', BANG_ADDRESS)}>{'BANG'}</div>
        <div className="tab" onClick={addTokenToWallet('dYEL', DYEL_ADDRESS)}>{'dYEL'}</div>
      </div>
    </div>
  );
};