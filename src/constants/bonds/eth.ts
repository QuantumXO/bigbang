import { Bond } from '@services/common/bond/bond';
import tokensIcons from '@constants/icons';

export const USDCInETH: Bond = new Bond({
  id: 'USDC',
  bondIcon: tokensIcons.USDC,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'ETH',
});
export const wETH: Bond = new Bond({
  id: 'wETH',
  bondIcon: tokensIcons.wETH,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'ETH',
  isWrap: true,
});
export const BIGwETH: Bond = new Bond({
  id: 'BIGwETH',
  displayName: 'BIGwETH',
  bondIcon: tokensIcons.wETH,
  bondLPIcon: tokensIcons.BIG,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'ETH',
  isLP: true,
});
export const SUSHI: Bond = new Bond({
  id: 'SUSHI',
  bondIcon: tokensIcons.SUSHI,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'ETH',
});
export const CVX: Bond = new Bond({
  id: 'CVX',
  bondIcon: tokensIcons.CVX,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'ETH',
});
export const YFI: Bond = new Bond({
  id: 'YFI',
  bondIcon: tokensIcons.YFI,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'ETH',
});
export const ALCX: Bond = new Bond({
  id: 'ALCX',
  bondIcon: tokensIcons.ALCX,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'ETH',
});
export const AAVE: Bond = new Bond({
  id: 'AAVE',
  bondIcon: tokensIcons.AAVE,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'ETH',
});
export const UNI: Bond = new Bond({
  id: 'UNI',
  bondIcon: tokensIcons.UNI,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'ETH',
});
export const MKR: Bond = new Bond({
  id: 'MKR',
  bondIcon: tokensIcons.MKR,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'ETH',
});
export const COMP: Bond = new Bond({
  id: 'COMP',
  bondIcon: tokensIcons.COMP,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'ETH',
});
export const SPELL: Bond = new Bond({
  id: 'SPELL',
  bondIcon: tokensIcons.SPELL,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'ETH',
});
export const YEL: Bond = new Bond({
  id: 'YEL',
  bondIcon: tokensIcons.YEL,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'ETH',
});
export const CRV: Bond = new Bond({
  id: 'CRV',
  bondIcon: tokensIcons.CRV,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'ETH',
});
export const FARM: Bond = new Bond({
  id: 'FARM',
  bondIcon: tokensIcons.FARM,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'ETH',
});
export const BAL: Bond = new Bond({
  id: 'BAL',
  bondIcon: tokensIcons.BAL,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'ETH',
});

export default <Bond[]>[
  USDCInETH, wETH, BIGwETH, SUSHI, CVX, YFI, ALCX, AAVE, UNI, MKR, COMP, SPELL, YEL, CRV, FARM, BAL
];