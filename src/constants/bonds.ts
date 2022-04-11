import { Bond } from '@services/helpers/bond/bond';
import { StableReserveContract, StableBondContract } from "@services/abi";

import { tokensIcons } from '@constants/tokens';

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
});
export const USDC: Bond = new Bond({
  id: 'USDC',
  displayName: 'USDC',
  bondToken: 'USDC',
  bondIconSvg: tokensIcons.USDCIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  bondAddress: '0xFFf2fDd8Ff796cD3903b0CE550f0050172804215',
  tokensInStrategy: '0',
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
});

export default <(Bond)[]>[
  wFTM, USDC, SCREAM, GEIST, TSHARE, MULTI, BOO, BIGwFTM
];