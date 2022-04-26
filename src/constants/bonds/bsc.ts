import { Bond } from '@services/common/bond/bond';
import tokensIcons from '@constants/icons';

export const USDCInBSC: Bond = new Bond({
  id: 'USDC',
  bondIcon: tokensIcons.USDC,
  bondAddress: '0x76f8964226641153b202e70a3216e88aae9313aa',
  tokensInStrategy: '0',
  networkType: 'BSC',
});
export const wBNB: Bond = new Bond({
  id: 'wBNB',
  bondIcon: tokensIcons.wBNB,
  bondAddress: '0x33301DE76Bb8b4Cd0fce60Dd08f574a06fe2b865',
  tokensInStrategy: '0',
  networkType: 'BSC',
  isWrap: true,
});
export const BIGwBNB: Bond = new Bond({
  id: 'BIGwBNB',
  displayName: 'BIG_wBNB',
  bondIcon: tokensIcons.BIG,
  bondLPIcon: tokensIcons.wBNB,
  bondAddress: '0xA5aDE4EAC20a1F1f90a51E5eaA2852D8ea098C89',
  tokensInStrategy: '0',
  networkType: 'BSC',
  isLP: true,
});
export const CAKE: Bond = new Bond({
  id: 'CAKE',
  bondIcon: tokensIcons.CAKE,
  bondAddress: '0x9A76A85F4236c8990A54dC1cBb38775Ebbeb2049',
  tokensInStrategy: '0',
  networkType: 'BSC',
});
export const BIFI: Bond = new Bond({
  id: 'BIFI',
  bondIcon: tokensIcons.BIFI,
  bondAddress: '0x6b52b628804f1b70c241bdb1063af046421d1020',
  tokensInStrategy: '0',
  networkType: 'BSC',
});
export const UNI: Bond = new Bond({
  id: 'UNI',
  bondIcon: tokensIcons.UNI,
  bondAddress: '0xC58f4443485A2B8fa6303C2617d881E3C029C808',
  tokensInStrategy: '0',
  networkType: 'BSC',
});
export const MBOX: Bond = new Bond({
  id: 'MBOX',
  bondIcon: tokensIcons.MBOX,
  bondAddress: '0xd1DB75f6498144aEe4fc62401A742f6780e3FeDe',
  tokensInStrategy: '0',
  networkType: 'BSC',
});
export const ALPACA: Bond = new Bond({
  id: 'ALPACA',
  bondIcon: tokensIcons.ALPACA,
  bondAddress: '0xCC19af8879a435170063D6Ab3061bCf5C14b57D4',
  tokensInStrategy: '0',
  networkType: 'BSC',
});
export const STG: Bond = new Bond({
  id: 'STG',
  bondIcon: tokensIcons.STG,
  bondAddress: '0x14e62a57D4fcAAfC2021E7e065C3FfE3Bfef602a',
  tokensInStrategy: '0',
  networkType: 'BSC',
});
export const YEL: Bond = new Bond({
  id: 'YEL',
  bondIcon: tokensIcons.YEL,
  bondAddress: '0xdf77dc6136a99116100853669bd42693b8f93733',
  tokensInStrategy: '0',
  networkType: 'BSC',
});

export default <Bond[]>[
  USDCInBSC, wBNB, BIGwBNB, CAKE, BIFI, UNI, MBOX, ALPACA, STG, YEL
];