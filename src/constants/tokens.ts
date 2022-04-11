import { IBlockchain } from '@models/blockchain';

import AvaxIcon from "@assets/images/tokens/AVAX.svg";
import FTMIcon from "@assets/images/common/tokens/ftm.svg";
import SCREAMIcon from "@assets/images/common/tokens/scream.png";
import GEISTIcon from '@assets/images/common/tokens/geist.png';
import USDCIcon from "@assets/images/common/tokens/usdc.svg";
import TSHAREIcon from "@assets/images/common/tokens/tshare.svg";
import MULTICHAINIcon from "@assets/images/common/tokens/multichain.png";
import BOOIcon from "@assets/images/common/tokens/boo.png";
import MATICIcon from "@assets/images/common/tokens/matic.svg";

export const tokensIcons: Record<string, string> = {
  AvaxIcon, FTMIcon, SCREAMIcon, GEISTIcon, USDCIcon, TSHAREIcon, MULTICHAINIcon, BOOIcon, MATICIcon,
};

export interface ITokenAsset extends Pick<
  IBlockchain.IToken,
  'id' | 'icon' | 'decimals' | 'name' | 'isWrap' | 'isLP' | 'isStable' | 'isBigNativeCurrencyLP' | 'isUSDCNativeCurrencyLP'
  > {
  id: IBlockchain.TokenType;
  icon: string;
  decimals: number;
  name: IBlockchain.TokenNameType;
  isWrap?: boolean;
  isLP?: boolean;
  isStable?: boolean;
}

export const usdc: ITokenAsset = {
  id: "USDC",
  icon: USDCIcon,
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
//-------------- FTM --------------
export const wftm: ITokenAsset = {
  id: "wFTM",
  icon: FTMIcon,
  decimals: 18,
  name: 'wFTM',
  isWrap: true,
};
export const usdcWftm: ITokenAsset = {
  id: "USDCwFTM",
  icon: AvaxIcon,
  decimals: 18,
  name: 'USDCwFTM',
  isLP: true,
  isUSDCNativeCurrencyLP: true,
};
export const bigWftm: ITokenAsset = {
  id: "BIGwFTM",
  icon: AvaxIcon, // #TODO
  decimals: 18,
  name: 'BIGwFTM',
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
//-------------- POLYGON --------------
export const wMATIC: ITokenAsset = {
  id: "wMATIC",
  icon: MATICIcon,
  decimals: 18,
  name: 'wMATIC',
  isWrap: true,
};
export const bigWmatic: ITokenAsset = {
  id: "BIGwMATIC",
  icon: AvaxIcon,
  decimals: 18,
  name: 'BIGwMATIC',
  isLP: true,
  isBigNativeCurrencyLP: true,
};
export const usdcWmatic: ITokenAsset = {
  id: "USDCwMATIC",
  icon: AvaxIcon,
  decimals: 18,
  name: 'USDCwMATIC',
  isLP: true,
  isUSDCNativeCurrencyLP: true,
};
export const quick: ITokenAsset = {
  id: "QUICK",
  icon: AvaxIcon,
  decimals: 18,
  name: 'QUICK',
};
export const crv: ITokenAsset = {
  id: "CRV",
  icon: AvaxIcon,
  decimals: 18,
  name: 'CRV',
};

const ftmTokens = [wftm, usdcWftm, bigWftm, scream, geist, tshare, multi, boo];
const maticTokens = [wMATIC, bigWmatic, usdcWmatic, quick, crv];

export default <ITokenAsset[]>[
  usdc, ...ftmTokens, ...maticTokens
];