import { IBlockchain } from '@models/blockchain';
import tokensIcons from '@constants/icons';

export const wftm: IBlockchain.ITokenAsset = {
  id: 'wFTM',
  icon: tokensIcons.FTMIcon,
  decimals: 18,
  name: 'wFTM',
  isWrap: true,
};
export const bigWftm: IBlockchain.ITokenAsset = {
  id: 'BIGwFTM',
  icon: tokensIcons.AvaxIcon, // #TODO
  decimals: 18,
  name: 'BIGwFTM',
  isLP: true,
  isBigNativeCurrencyLP: true,
};
export const scream: IBlockchain.ITokenAsset = {
  id: 'SCREAM',
  icon: tokensIcons.SCREAMIcon,
  decimals: 18,
  name: 'SCREAM',
};
export const geist: IBlockchain.ITokenAsset = {
  id: 'GEIST',
  icon: tokensIcons.GEISTIcon,
  decimals: 18,
  name: 'GEIST',
};
export const tshare: IBlockchain.ITokenAsset = {
  id: 'TSHARE',
  icon: tokensIcons.TSHAREIcon,
  decimals: 18,
  name: 'TSHARE',
};
export const multi: IBlockchain.ITokenAsset = {
  id: 'MULTI',
  icon: tokensIcons.MULTICHAINIcon,
  decimals: 18,
  name: 'MULTI',
};
export const boo: IBlockchain.ITokenAsset = {
  id: 'BOO',
  icon: tokensIcons.BOOIcon,
  decimals: 18,
  name: 'BOO',
};
export const yel: IBlockchain.ITokenAsset = {
  id: 'YEL',
  icon: tokensIcons.dYelIcon,
  decimals: 18,
  name: 'YEL',
};
export const beets: IBlockchain.ITokenAsset = {
  id: 'BEETS',
  icon: tokensIcons.beetsIcon,
  decimals: 18,
  name: 'BEETS',
};
export const link: IBlockchain.ITokenAsset = {
  id: 'LINK',
  icon: tokensIcons.AvaxIcon,
  decimals: 18,
  name: 'LINK',
};
export const spirit: IBlockchain.ITokenAsset = {
  id: 'SPIRIT',
  icon: tokensIcons.AvaxIcon,
  decimals: 18,
  name: 'SPIRIT',
};

export default <IBlockchain.ITokenAsset[]>[
  wftm, bigWftm, scream, geist, tshare, multi, boo, yel, beets, link, spirit,
];