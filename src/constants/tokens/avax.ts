import { IBlockchain } from '@models/blockchain';
import tokensIcons from '@constants/icons';

const AVAXTokens: IBlockchain.ITokenAsset[] = [
  { id: 'wAVAX', icon: tokensIcons.wAVAX, decimals: 18, name: 'wAVAX', isWrap: true },
  { id: 'BIGwAVAX', icon: tokensIcons.AVAX, decimals: 18, name: 'BIGwAVAX', isLP: true, isBigNativeCurrencyLP: true },
  { id: 'JOE', icon: tokensIcons.JOE, decimals: 18, name: 'JOE' },
  { id: 'LINK', icon: tokensIcons.LINK, decimals: 18, name: 'LINK.e' },
  { id: 'PTP', icon: tokensIcons.PTP, decimals: 18, name: 'PTP' },
  { id: 'SPELL', icon: tokensIcons.SPELL, decimals: 18, name: 'SPELL' },
  { id: 'AAVE', icon: tokensIcons.AAVE, decimals: 18, name: 'AAVE' },
  { id: 'wMEMO', icon: tokensIcons.wMEMO, decimals: 18, name: 'wMEMO' },
  // { id: 'YEL', icon: tokensIcons.YEL, decimals: 18, name: 'YEL' },
];

export default AVAXTokens;