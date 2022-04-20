import { Bond } from '@services/common/bond';
import tokensIcons from '@constants/icons';

export const USDCInAVAX: Bond = new Bond({
  id: 'USDC',
  bondIcon: tokensIcons.USDC,
  bondAddress: '0x06f80Af9D6422B7F28340Db1b91f6d3dDc891094',
  tokensInStrategy: '0',
  networkType: 'AVAX',
});
export const wAVAX: Bond = new Bond({
  id: 'wAVAX',
  bondIcon: tokensIcons.wAVAX,
  bondAddress: '0x5f5aecabd37f4e219719151e4b44f4d94f3a9c9c',
  tokensInStrategy: '0',
  networkType: 'AVAX',
  isWrap: true,
});
export const BIGwAVAX: Bond = new Bond({
  id: 'BIGwAVAX',
  displayName: 'BIG_wAVAX',
  bondIcon: tokensIcons.BIG,
  bondLPIcon: tokensIcons.wAVAX,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'AVAX',
  isLP: true,
});
export const JOE: Bond = new Bond({
  id: 'JOE',
  bondIcon: tokensIcons.JOE,
  bondAddress: '0xb08f8f3e8d64d738385b46022f40ffb4eadd29fa',
  tokensInStrategy: '0',
  networkType: 'AVAX',
});
export const LINK: Bond = new Bond({
  id: 'LINK.e',
  bondIcon: tokensIcons['LINK.e'],
  bondAddress: '0x1EcAc9574b64190573F7663F30ec28e3c1501F28',
  tokensInStrategy: '0',
  networkType: 'AVAX',
});
export const PTP: Bond = new Bond({
  id: 'PTP',
  bondIcon: tokensIcons.PTP,
  bondAddress: '0x8c04BF0cEB1aE8551B3Bd68437857b4e9e64f23F',
  tokensInStrategy: '0',
  networkType: 'AVAX',
});
export const SPELL: Bond = new Bond({
  id: 'SPELL',
  bondIcon: tokensIcons.SPELL,
  bondAddress: '0x9091f9703e095EDCd5E94B767fb1918D0394f1B8',
  tokensInStrategy: '0',
  networkType: 'AVAX',
});
export const AAVE: Bond = new Bond({
  id: 'AAVE',
  bondIcon: tokensIcons.AAVE,
  bondAddress: '0x13d29AF97254F89d86FA3D4D3247641BF1676d39',
  tokensInStrategy: '0',
  networkType: 'AVAX',
});
export const wMEMO: Bond = new Bond({
  id: 'wMEMO',
  bondIcon: tokensIcons.AAVE,
  bondAddress: '0xb32fb836993905b02e0504e8763cd05e913f8df0',
  tokensInStrategy: '0',
  networkType: 'AVAX',
});
export const YEL: Bond = new Bond({
  id: 'YEL',
  bondIcon: tokensIcons.YEL,
  bondAddress: '',
  tokensInStrategy: '0',
  networkType: 'AVAX',
});

export default <Bond[]>[
  USDCInAVAX, wAVAX, BIGwAVAX, JOE, LINK, PTP, SPELL, AAVE, wMEMO, YEL
];