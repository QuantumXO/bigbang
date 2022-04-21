import { Bond } from '@services/helpers/bond/bond';
import tokensIcons from '@constants/icons';

export const USDCInPOLYGON: Bond = new Bond({
  id: 'USDC',
  bondIcon: tokensIcons.USDC,
  bondAddress: '0x3F25ED5eF6C026d460DF78944c5d72db0e29EDd7',
  tokensInStrategy: '0',
  networkType: 'MATIC',
});
export const wMATIC: Bond = new Bond({
  id: 'wMATIC',
  bondIcon: tokensIcons.wMATIC,
  bondAddress: '0x1a8E70cDdb478BDE0Bd3AECa9bc0caF471999a2d',
  tokensInStrategy: '0',
  networkType: 'MATIC',
  isWrap: true,
});
export const BIGwMATIC: Bond = new Bond({
  id: 'BIGwMATIC',
  displayName: 'BIG_wMATIC',
  bondIcon: tokensIcons.BIG,
  bondLPIcon: tokensIcons.wMATIC,
  bondAddress: '0xF85eDa4ecfD47C459Ae24c873592b85aF55Db910',
  tokensInStrategy: '0',
  networkType: 'MATIC',
  isLP: true,
});
export const QUICK: Bond = new Bond({
  id: 'QUICK',
  bondIcon: tokensIcons.QUICK,
  bondAddress: '0x7f0c0A8083567dDac545b043619F09351DBB55d1',
  tokensInStrategy: '0',
  networkType: 'MATIC',
});
export const CRV: Bond = new Bond({
  id: 'CRV',
  bondIcon: tokensIcons.CRV,
  bondAddress: '0x8E5Ba462710FA01ecEFbaf28E91c4F312e013787',
  tokensInStrategy: '0',
  networkType: 'MATIC',
});
export const SAND: Bond = new Bond({
  id: 'SAND',
  bondIcon: tokensIcons.SAND,
  bondAddress: '0xb388Ec6B007e5416FC34a96F386A2E578354A919',
  tokensInStrategy: '0',
  networkType: 'MATIC',
});
export const ORBS: Bond = new Bond({
  id: 'ORBS',
  bondIcon: tokensIcons.ORBS,
  bondAddress: '0xbc6990Ab2CcA30d896cdde7513fcfCaa369456Ab',
  tokensInStrategy: '0',
  networkType: 'MATIC',
});
export const YEL: Bond = new Bond({
  id: 'YEL',
  bondIcon: tokensIcons.YEL,
  bondAddress: '0x835091A2149329c8C38CcC966bc5Bb459891832e',
  tokensInStrategy: '0',
  networkType: 'MATIC',
});
export const QI: Bond = new Bond({
  id: 'QI',
  bondIcon: tokensIcons.QI,
  bondAddress: '0x16A63efD7a52f8e50DC753f699bFdffCaE695967',
  tokensInStrategy: '0',
  networkType: 'MATIC',
});

export default <Bond[]>[
  USDCInPOLYGON, wMATIC, QUICK, CRV, SAND, ORBS, YEL, BIGwMATIC, QI
];