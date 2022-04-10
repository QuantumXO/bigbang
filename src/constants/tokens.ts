import { IBlockchain } from '@models/blockchain';

import AvaxIcon from "@assets/images/tokens/AVAX.svg";
import FTMIcon from "@assets/images/common/tokens/ftm.svg";
import SCREAMIcon from "@assets/images/common/tokens/scream.png";
import GEISTIcon from '@assets/images/common/tokens/geist.png';
import USDCIcon from "@assets/images/common/tokens/usdc.svg";
import TSHAREIcon from "@assets/images/common/tokens/tshare.svg";
import MULTICHAINIcon from "@assets/images/common/tokens/multichain.png";
import BOOIcon from "@assets/images/common/tokens/boo.png";

export const tokensIcons: Record<string, string> = {
  AvaxIcon, FTMIcon, SCREAMIcon, GEISTIcon, USDCIcon, TSHAREIcon, MULTICHAINIcon, BOOIcon
};

export interface ITokenAsset extends Pick<
  IBlockchain.IToken,
  'id' | 'icon' | 'decimals' | 'name' | 'isWrap' | 'isLP' | 'isStable' | 'isBigNativeCurrencyLP' | 'isCommonNativeCurrencyLP'
  > {
  id: IBlockchain.WTF_TokenType;
  icon: string;
  decimals: number;
  name: IBlockchain.WTF_TokenNameType;
  isWrap?: boolean;
  isLP?: boolean;
  isStable?: boolean;
}

export const wftm: ITokenAsset = {
  id: "wFTM",
  icon: FTMIcon,
  decimals: 18,
  name: 'wFTM',
  isWrap: true,
};
export const ftm: ITokenAsset = {
  id: "FTM",
  icon: FTMIcon,
  decimals: 18,
  name: 'FTM',
};
export const usdcWftm: ITokenAsset = {
  id: "USDCwFTM",
  icon: AvaxIcon,
  decimals: 18,
  name: 'USDCwFTM',
  isCommonNativeCurrencyLP: true,
};
export const usdc: ITokenAsset = {
  id: "USDC",
  icon: AvaxIcon,
  decimals: 6,
  name: 'USDC',
  isStable: true,
};
export const wusdc: ITokenAsset = {
  id: "wUSDC",
  icon: AvaxIcon,
  decimals: 6,
  name: 'wUSDC',
  isWrap: true,
};
export const bigWftm: ITokenAsset = {
  id: "BIG_wFTM",
  icon: AvaxIcon,
  decimals: 18,
  name: 'BIG_wFTM',
  isLP: true,
  isBigNativeCurrencyLP: true,
};
export const scream: ITokenAsset = {
  id: "SCREAM",
  icon: SCREAMIcon,
  decimals: 18,
  name: 'SCREAM',
};
export const geist: ITokenAsset = {
  id: "GEIST",
  icon: GEISTIcon,
  decimals: 18,
  name: 'GEIST',
};
export const tshare: ITokenAsset = {
  id: "TSHARE",
  icon: TSHAREIcon,
  decimals: 18,
  name: 'TSHARE',
};
export const multi: ITokenAsset = {
  id: "MULTI",
  icon: MULTICHAINIcon,
  decimals: 18,
  name: 'MULTI',
};
export const boo: ITokenAsset = {
  id: "BOO",
  icon: BOOIcon,
  decimals: 18,
  name: 'BOO',
};

export default <ITokenAsset[]>[
  wftm, ftm, usdc, usdcWftm, bigWftm, scream, geist, tshare, multi, boo
];