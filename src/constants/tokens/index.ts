import { IBlockchain } from '@models/blockchain';
import tokensIcons from '@constants/icons';

import FTMTokens from './ftm';
import POLYGONTokens from './polygon';
import BSCTokens from './bsc';
import AVAXTokens from '@constants/tokens/avax';
import ETHTokens from '@constants/tokens/eth';

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
  usdc, ...FTMTokens, ...POLYGONTokens, ...BSCTokens, ...AVAXTokens, ...ETHTokens,
];