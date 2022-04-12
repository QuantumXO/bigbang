import { Bond } from '@services/common/bond';
import { StableReserveContract, StableBondContract } from "@services/abi";

import { tokensIcons } from '@constants/tokens';

//-------------- FTM --------------
export const USDCInFTM: Bond = new Bond({
  id: 'USDC',
  displayName: 'USDC',
  bondToken: 'USDC',
  bondIconSvg: tokensIcons.USDCIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  bondAddress: '0xFFf2fDd8Ff796cD3903b0CE550f0050172804215',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const wFTM: Bond = new Bond({
  id: 'wFTM',
  isWrap: true,
  displayName: 'wFTM',
  bondToken: 'wFTM',
  bondIconSvg: tokensIcons.FTMIcon,
  bondAddress: '0xc59570FA143af3db62E0f36B9fe0723e9F6Db5B5',
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const SCREAM: Bond = new Bond({
  id: 'SCREAM',
  displayName: 'SCREAM',
  bondToken: 'SCREAM',
  bondIconSvg: tokensIcons.SCREAMIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  bondAddress: '0x08dafdB796f7E95dD4f16f910Db84E3f9Ade7b99',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const GEIST: Bond = new Bond({
  id: 'GEIST',
  displayName: 'GEIST',
  bondToken: 'GEIST',
  bondIconSvg: tokensIcons.GEISTIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  bondAddress: '0x85878783Fea0ED4d59c893634B3F836D69574929',
  tokensInStrategy: '0',
});
export const TSHARE: Bond = new Bond({
  id: 'TSHARE',
  displayName: 'TSHARE',
  bondToken: 'TSHARE',
  bondIconSvg: tokensIcons.TSHAREIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  bondAddress: '0xA2C549AA935bdD275429E02989b8888A68e47Bfc',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const MULTI: Bond = new Bond({
  id: 'MULTI',
  displayName: 'MULTI',
  bondToken: 'MULTI',
  bondIconSvg: tokensIcons.MULTICHAINIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  bondAddress: '0x534fD86683b1012745070bb1d78aE0907C43d5d9',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const BOO: Bond = new Bond({
  id: 'BOO',
  displayName: 'BOO',
  bondToken: 'BOO',
  bondIconSvg: tokensIcons.BOOIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  bondAddress: '0xFDED6d63356d130b363BefF73F01d05Cc5B196AD',
  tokensInStrategy: '0',
  networkType: 'FTM',
});
export const BIGwFTM: Bond = new Bond({
  id: 'BIGwFTM',
  displayName: 'BIGwFTM',
  bondToken: 'BIGwFTM',
  bondIconSvg: tokensIcons.AvaxIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  bondAddress: '0xa0DEFC1F78C4bcCD402b8d0ED1089Ff9E2a58171',
  tokensInStrategy: '0',
  isLP: true,
  networkType: 'FTM',
});
//-------------- POLYGON --------------
export const wMATIC: Bond = new Bond({
  id: 'wMATIC',
  isWrap: true,
  displayName: 'wMATIC',
  bondToken: 'wMATIC',
  bondIconSvg: tokensIcons.MATICIcon,
  bondAddress: '0x9A7ebf612B6f254feaFA4f4249361132FCC39D51',
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  tokensInStrategy: '0',
  networkType: 'MATIC',
});
export const QUICK: Bond = new Bond({
  id: 'QUICK',
  displayName: 'QUICK',
  bondToken: 'QUICK',
  bondIconSvg: tokensIcons.AvaxIcon,
  bondAddress: '0x7f0c0A8083567dDac545b043619F09351DBB55d1',
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  tokensInStrategy: '0',
  networkType: 'MATIC',
});
export const CRV: Bond = new Bond({
  id: 'CRV',
  displayName: 'CRV',
  bondToken: 'CRV',
  bondIconSvg: tokensIcons.AvaxIcon,
  bondAddress: '0x8E5Ba462710FA01ecEFbaf28E91c4F312e013787',
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  tokensInStrategy: '0',
  networkType: 'MATIC',
});
export const USDCInPOLYGON: Bond = new Bond({
  id: 'USDC',
  displayName: 'USDC',
  bondToken: 'USDC',
  bondIconSvg: tokensIcons.USDCIcon,
  bondAddress: '0x3F25ED5eF6C026d460DF78944c5d72db0e29EDd7',
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  tokensInStrategy: '0',
  networkType: 'MATIC',
});

const FTMBonds: Bond[] = [USDCInPOLYGON, wFTM, SCREAM, GEIST, TSHARE, MULTI, BOO, BIGwFTM];
const POLYGONBonds: Bond[] = [USDCInFTM, wMATIC, QUICK, CRV];

export default <(Bond)[]>[
  ...FTMBonds, ...POLYGONBonds,
];