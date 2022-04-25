import { IBlockchain } from '@models/blockchain';
import tokensIcons from '@constants/icons';

const ETHTokens: IBlockchain.ITokenAsset[] = [
  { id: 'wETH', icon: tokensIcons.wAVAX, decimals: 18, name: 'wETH', isWrap: true },
  { id: 'BIGwETH', icon: tokensIcons.AVAX, decimals: 18, name: 'BIGwETH', isLP: true, isBigNativeCurrencyLP: true },
  { id: 'wETH', icon: tokensIcons.wETH, decimals: 18, name: 'wETH' },
  { id: 'SUSHI', icon: tokensIcons.SUSHI, decimals: 18, name: 'SUSHI' },
  { id: 'CVX', icon: tokensIcons.CVX, decimals: 18, name: 'CVX' },
  { id: 'YFI', icon: tokensIcons.YFI, decimals: 18, name: 'YFI' },
  { id: 'ALCX', icon: tokensIcons.ALCX, decimals: 18, name: 'ALCX' },
  { id: 'AAVE', icon: tokensIcons.AAVE, decimals: 18, name: 'AAVE' },
  { id: 'UNI', icon: tokensIcons.UNI, decimals: 18, name: 'UNI' },
  { id: 'MKR', icon: tokensIcons.MKR, decimals: 18, name: 'MKR' },
  { id: 'COMP', icon: tokensIcons.COMP, decimals: 18, name: 'COMP' },
  { id: 'SPELL', icon: tokensIcons.SPELL, decimals: 18, name: 'SPELL' },
  { id: 'YEL', icon: tokensIcons.YEL, decimals: 18, name: 'YEL' },
  { id: 'CRV', icon: tokensIcons.CRV, decimals: 18, name: 'CRV' },
  { id: 'FARM', icon: tokensIcons.FARM, decimals: 18, name: 'FARM' },
  { id: 'BAL', icon: tokensIcons.BAL, decimals: 18, name: 'BAL' },
];

export default ETHTokens;