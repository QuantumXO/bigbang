import { Bond } from '@services/helpers/bond/bond';
import tokensIcons from '@constants/icons';

export const USDCInBSC: Bond = new Bond({
  id: 'USDC',
  bondIcon: tokensIcons.USDC,
  bondAddress: '0x920F0bc2f095f6fa598cbA0E6f17d38A993EC768',
  tokensInStrategy: '0',
  networkType: 'BSC',
});
export const wBNB: Bond = new Bond({
  id: 'wBNB',
  bondIcon: tokensIcons.wBNB,
  bondAddress: '0x59Cfc6693D92233f792C17fD509200528A3E1504',
  tokensInStrategy: '0',
  networkType: 'BSC',
  isWrap: true,
});
export const BIGwBNB: Bond = new Bond({
  id: 'BIGwBNB',
  displayName: 'BIG_wBNB',
  bondIcon: tokensIcons.BIG,
  bondLPIcon: tokensIcons.wBNB,
  bondAddress: '0x5E9b18a94c43822c48Afc5392d8Dd9312D8AB2d3',
  tokensInStrategy: '0',
  networkType: 'BSC',
  isLP: true,
});
export const CAKE: Bond = new Bond({
  id: 'CAKE',
  bondIcon: tokensIcons.CAKE,
  bondAddress: '0xecB98DB16a419fE1120D744f957C954646AFF128',
  tokensInStrategy: '0',
  networkType: 'BSC',
});
export const BIFI: Bond = new Bond({
  id: 'BIFI',
  bondIcon: tokensIcons.BIFI,
  bondAddress: '0x707ad5658e9c91284f98d8721254c557ebf76887',
  tokensInStrategy: '0',
  networkType: 'BSC',
});
export const UNI: Bond = new Bond({
  id: 'UNI',
  bondIcon: tokensIcons.UNI,
  bondAddress: '0x193a94155592a68aCa632712C16dF8Fa55ED6620',
  tokensInStrategy: '0',
  networkType: 'BSC',
});
export const MBOX: Bond = new Bond({
  id: 'MBOX',
  bondIcon: tokensIcons.MBOX,
  bondAddress: '0xc9D2bc6A2bcC89b0A791d4cEa086f2ad6112965f',
  tokensInStrategy: '0',
  networkType: 'BSC',
});
export const ALPACA: Bond = new Bond({
  id: 'ALPACA',
  bondIcon: tokensIcons.ALPACA,
  bondAddress: '0x272d530aEe0fbBD3d8D181BB7918c680F77B9e0e',
  tokensInStrategy: '0',
  networkType: 'BSC',
});
export const STG: Bond = new Bond({
  id: 'STG',
  bondIcon: tokensIcons.STG,
  bondAddress: '0x56fc18882f392379c9CA4b34468D619C1f845dF7',
  tokensInStrategy: '0',
  networkType: 'BSC',
});
export const YEL: Bond = new Bond({
  id: 'YEL',
  bondIcon: tokensIcons.YEL,
  bondAddress: '0x825F242018ecF6BBb3Eb9Ad55d978D40201ecB1A',
  tokensInStrategy: '0',
  networkType: 'BSC',
});

export default <Bond[]>[
  USDCInBSC, wBNB, BIGwBNB, CAKE, BIFI, UNI, MBOX, ALPACA, STG, YEL
];