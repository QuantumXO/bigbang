import { Bond } from '@services/common/bond';
import tokensIcons from '@constants/icons';

export const USDCInFTM: Bond = new Bond({
  id: 'USDC',
  bondIcon: tokensIcons.USDC,
  bondAddress: '0xFFf2fDd8Ff796cD3903b0CE550f0050172804215',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const wFTM: Bond = new Bond({
  id: 'wFTM',
  bondIcon: tokensIcons.wFTM,
  bondAddress: '0xc59570FA143af3db62E0f36B9fe0723e9F6Db5B5',
  tokensInStrategy: '0',
  networkType: 'FTM',
  isWrap: true,
});
export const BIGwFTM: Bond = new Bond({
  id: 'BIGwFTM',
  displayName: 'BIG_wFTM',
  bondIcon: tokensIcons.AVAX,
  bondAddress: '0x13dA1FC51978FAB071eD28e65E7825Cf4860c9F8',
  tokensInStrategy: '0',
  networkType: 'FTM',
  isLP: true,
});
export const SCREAM: Bond = new Bond({
  id: 'SCREAM',
  bondIcon: tokensIcons.SCREAM,
  bondAddress: '0x08dafdB796f7E95dD4f16f910Db84E3f9Ade7b99',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const GEIST: Bond = new Bond({
  id: 'GEIST',
  bondIcon: tokensIcons.GEIST,
  bondAddress: '0x85878783Fea0ED4d59c893634B3F836D69574929',
  tokensInStrategy: '0',
});
export const TSHARE: Bond = new Bond({
  id: 'TSHARE',
  bondIcon: tokensIcons.TSHARE,
  bondAddress: '0xA2C549AA935bdD275429E02989b8888A68e47Bfc',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const MULTI: Bond = new Bond({
  id: 'MULTI',
  bondIcon: tokensIcons.MULTI,
  bondAddress: '0x534fD86683b1012745070bb1d78aE0907C43d5d9',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const BOO: Bond = new Bond({
  id: 'BOO',
  bondIcon: tokensIcons.BOO,
  bondAddress: '0x25e9beC87a4408517cb9A0c0eC5CA6194Ab976c4',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const YEL: Bond = new Bond({
  id: 'YEL',
  bondIcon: tokensIcons.YEL,
  bondAddress: '0x4DF06b47a6BA88127A056Fc8522bbbE6289cFB23',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const BEETS: Bond = new Bond({
  id: 'BEETS',
  bondIcon: tokensIcons.BEETS,
  bondAddress: '0x081725889c8CC14afcd601965e79d65BbF00778d',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const YFI: Bond = new Bond({
  id: 'YFI',
  bondIcon: tokensIcons.YFI,
  bondAddress: '0x6b0d624B55b4aBFf9A2D593F991DEf893c335f1b',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const LINK: Bond = new Bond({
  id: 'LINK',
  bondIcon: tokensIcons.LINK,
  bondAddress: '0xb9646742Ec3c349Cb223fe7d19E549E4142c8743',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const SPIRIT: Bond = new Bond({
  id: 'SPIRIT',
  bondIcon: tokensIcons.SPIRIT,
  bondAddress: '0xb9646742Ec3c349Cb223fe7d19E549E4142c8743',
  tokensInStrategy: '0',
  networkType: 'FTM',
});

export default <Bond[]>[
  USDCInFTM, wFTM, SCREAM, GEIST, TSHARE, MULTI, BOO, BIGwFTM, YEL, BEETS, YFI, LINK, SPIRIT
];