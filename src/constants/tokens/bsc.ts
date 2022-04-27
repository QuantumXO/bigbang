import { IBlockchain } from '@models/blockchain';
import tokensIcons from '@constants/icons';

export const wBNB: IBlockchain.ITokenAsset = {
  id: 'wBNB',
  icon: tokensIcons.FTM,
  decimals: 18,
  name: 'wBNB',
  isWrap: true,
};
export const bigWbnb: IBlockchain.ITokenAsset = {
  id: 'BIGwBNB',
  icon: tokensIcons.Avax, // #TODO
  decimals: 18,
  name: 'BIGwBNB',
  isLP: true,
  isBigNativeCurrencyLP: true,
};
export const CAKE: IBlockchain.ITokenAsset = {
  id: 'CAKE',
  icon: tokensIcons.CAKE,
  decimals: 18,
  name: 'CAKE',
};
export const UNI: IBlockchain.ITokenAsset = {
  id: 'UNI',
  icon: tokensIcons.UNI,
  decimals: 18,
  name: 'UNI',
};
export const MBOX: IBlockchain.ITokenAsset = {
  id: 'MBOX',
  icon: tokensIcons.MBOX,
  decimals: 18,
  name: 'MBOX',
};
export const ALPACA: IBlockchain.ITokenAsset = {
  id: 'ALPACA',
  icon: tokensIcons.ALPACA,
  decimals: 18,
  name: 'ALPACA',
};
export const STG: IBlockchain.ITokenAsset = {
  id: 'STG',
  icon: tokensIcons.STG,
  decimals: 18,
  name: 'STG',
};
export const YEL: IBlockchain.ITokenAsset = {
  id: 'YEL',
  icon: tokensIcons.YEL,
  decimals: 18,
  name: 'YEL',
};
export const BIFI: IBlockchain.ITokenAsset = {
  id: 'BIFI',
  icon: tokensIcons.BIFI,
  decimals: 18,
  name: 'BIFI',
};

export default <IBlockchain.ITokenAsset[]>[
  wBNB, bigWbnb, CAKE, BIFI, UNI, ALPACA, MBOX, STG,
];