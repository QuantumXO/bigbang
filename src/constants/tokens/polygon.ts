import { IBlockchain } from '@models/blockchain';
import tokensIcons from '@constants/icons';

export const wMATIC: IBlockchain.ITokenAsset = {
  id: "wMATIC",
  icon: tokensIcons.MATIC,
  decimals: 18,
  name: 'wMATIC',
  isWrap: true,
};
export const bigWmatic: IBlockchain.ITokenAsset = {
  id: "BIGwMATIC",
  icon: tokensIcons.Avax,
  decimals: 18,
  name: 'BIGwMATIC',
  isLP: true,
  isBigNativeCurrencyLP: true,
};
export const quick: IBlockchain.ITokenAsset = {
  id: "QUICK",
  icon: tokensIcons.Avax,
  decimals: 18,
  name: 'QUICK',
};
export const crv: IBlockchain.ITokenAsset = {
  id: "CRV",
  icon: tokensIcons.Avax,
  decimals: 18,
  name: 'CRV',
};
export const sand: IBlockchain.ITokenAsset = {
  id: "SAND",
  icon: tokensIcons.Avax,
  decimals: 18,
  name: 'SAND',
};
export const orbs: IBlockchain.ITokenAsset = {
  id: "ORBS",
  icon: tokensIcons.Avax,
  decimals: 18,
  name: 'ORBS',
};
export const yel: IBlockchain.ITokenAsset = {
  id: "YEL",
  icon: tokensIcons.Avax,
  decimals: 18,
  name: 'YEL',
};
export const qi: IBlockchain.ITokenAsset = {
  id: "QI",
  icon: tokensIcons.Avax,
  decimals: 18,
  name: 'QI',
};

export default <IBlockchain.ITokenAsset[]>[
  wMATIC, bigWmatic, quick, crv, sand, orbs, yel, qi
];