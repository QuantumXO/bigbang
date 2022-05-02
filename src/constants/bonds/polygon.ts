import { Bond } from '@services/common/bond/bond';
import tokensIcons from '@constants/icons';

export const USDCInPOLYGON: Bond = new Bond({
  id: 'USDC',
  bondIcon: tokensIcons.USDC,
  bondAddress: '0x20839e179b935d281c31222373da47b51d5e2182',
  tokensInStrategy: '0',
  networkType: 'MATIC',
});
export const wMATIC: Bond = new Bond({
  id: 'wMATIC',
  bondIcon: tokensIcons.wMATIC,
  bondAddress: '0x051243D33849664e82EFD8D0f4fedcFe8D076a69',
  tokensInStrategy: '0',
  networkType: 'MATIC',
  isWrap: true,
});
export const BIGwMATIC: Bond = new Bond({
  id: 'BIGwMATIC',
  displayName: 'BIG_wMATIC',
  bondIcon: tokensIcons.wMATIC,
  bondLPIcon: tokensIcons.BIG,
  bondAddress: '0x836652fA76Abc0359e46a1f86F1C1F5fFea6d03C',
  tokensInStrategy: '0',
  networkType: 'MATIC',
  isLP: true,
});
export const QUICK: Bond = new Bond({
  id: 'QUICK',
  bondIcon: tokensIcons.QUICK,
  bondAddress: '0x649658713013EDECF4f91879C0B5a3c6fB97d124',
  tokensInStrategy: '0',
  networkType: 'MATIC',
});
export const CRV: Bond = new Bond({
  id: 'CRV',
  bondIcon: tokensIcons.CRV,
  bondAddress: '0x5a6f2e846342c728672834c1ed9dae837fa658ef',
  tokensInStrategy: '0',
  networkType: 'MATIC',
});
export const SAND: Bond = new Bond({
  id: 'SAND',
  bondIcon: tokensIcons.SAND,
  bondAddress: '0x8cb18268abc99197c1e0b6773333d8da6c4085cc',
  tokensInStrategy: '0',
  networkType: 'MATIC',
});
export const ORBS: Bond = new Bond({
  id: 'ORBS',
  bondIcon: tokensIcons.ORBS,
  bondAddress: '0x4597c58f993a7f4d0c95babc42389e43c9869643',
  tokensInStrategy: '0',
  networkType: 'MATIC',
});
export const YEL: Bond = new Bond({
  id: 'YEL',
  bondIcon: tokensIcons.YEL,
  bondAddress: '0x447defd148c1ca66afbadd37932a5a4dff0c4c6f',
  tokensInStrategy: '0',
  networkType: 'MATIC',
});
export const QI: Bond = new Bond({
  id: 'QI',
  bondIcon: tokensIcons.QI,
  bondAddress: '0x0dfda905ad67ec2aec9bc5f017ef16065ca6c3f4',
  tokensInStrategy: '0',
  networkType: 'MATIC',
});

export default <Bond[]>[
  USDCInPOLYGON, wMATIC, QUICK, CRV, SAND, ORBS, YEL, BIGwMATIC, QI
];