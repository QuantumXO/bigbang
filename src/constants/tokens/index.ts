import { IBlockchain } from '@models/blockchain';
import tokensIcons from '@constants/icons';

import FTMTokens from './ftm';
import POLYGONTokens from './polygon';

export const usdc: IBlockchain.ITokenAsset = {
  id: 'USDC',
  icon: tokensIcons.USDCIcon,
  decimals: 6,
  name: 'USDC',
  isLP: true,
  isStable: true,
  isUSDCNativeCurrencyLP: true,
};

export default <IBlockchain.ITokenAsset[]>[
  usdc, ...FTMTokens, ...POLYGONTokens
];