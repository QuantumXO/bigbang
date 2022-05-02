import { Bond } from '@services/common/bond/bond';
import tokensIcons from '@constants/icons';

export const USDCInFTM: Bond = new Bond({
  id: 'USDC',
  bondIcon: tokensIcons.USDC,
  bondAddress: '0xAc8A418FCDF3fe8b0Bc2BFa63f54a0E231D3f92B',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const wFTM: Bond = new Bond({
  id: 'wFTM',
  bondIcon: tokensIcons.wFTM,
  bondAddress: '0xE10ABF664c307F8333aB076211edF53dA733bf65',
  tokensInStrategy: '0',
  networkType: 'FTM',
  isWrap: true,
});
export const BIGwFTM: Bond = new Bond({
  id: 'BIGwFTM',
  displayName: 'BIG_wFTM',
  bondIcon: tokensIcons.wFTM,
  bondLPIcon: tokensIcons.BIG,
  bondAddress: '0x5397c29bfea7596c6348bcccdcb2d95fac95885f',
  tokensInStrategy: '0',
  networkType: 'FTM',
  isLP: true,
});
export const SCREAM: Bond = new Bond({
  id: 'SCREAM',
  bondIcon: tokensIcons.SCREAM,
  bondAddress: '0xd955B9B92f534A81baAF6bb0DA74E7C26b9C3a46',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const GEIST: Bond = new Bond({
  id: 'GEIST',
  bondIcon: tokensIcons.GEIST,
  bondAddress: '0xBC7de8991A217AF108b33C9b68b4fB8B3FA98417',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const TSHARE: Bond = new Bond({
  id: 'TSHARE',
  bondIcon: tokensIcons.TSHARE,
  bondAddress: '0x16253b1ed49253cbe2a99a60b2a7daF7c317917A',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const MULTI: Bond = new Bond({
  id: 'MULTI',
  bondIcon: tokensIcons.MULTI,
  bondAddress: '0x8b3E03AC29e1e55C8012C7A659286309652E7405',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const BOO: Bond = new Bond({
  id: 'BOO',
  bondIcon: tokensIcons.BOO,
  bondAddress: '0x5F9da9D8a53e546b14f2f7f7e978dd64a228c64C',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const YEL: Bond = new Bond({
  id: 'YEL',
  bondIcon: tokensIcons.YEL,
  bondAddress: '0x32ca650a20e373D13d8bACf46353c70c4360c958',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const BEETS: Bond = new Bond({
  id: 'BEETS',
  bondIcon: tokensIcons.BEETS,
  bondAddress: '0x8cfef22001EFD73e8C7D13A002F615C2cF747542',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const YFI: Bond = new Bond({
  id: 'YFI',
  bondIcon: tokensIcons.YFI,
  bondAddress: '0x74D5D74DCE06c375fa3a2Da9923E2e896E77EB20',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const LINK: Bond = new Bond({
  id: 'LINK',
  bondIcon: tokensIcons.LINK,
  bondAddress: '0x04b08244ea4c40db7DaFcD40D8C21e993C562dc0',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const SPIRIT: Bond = new Bond({
  id: 'SPIRIT',
  bondIcon: tokensIcons.SPIRIT,
  bondAddress: '0xe204e9426101126e1C46a1b39BA82a1A32A7ce8a',
  tokensInStrategy: '0',
  networkType: 'FTM',
});

export default <Bond[]>[
  USDCInFTM, wFTM, SCREAM, GEIST, TSHARE, MULTI, BOO, BIGwFTM, YEL, BEETS, YFI, LINK, SPIRIT
];