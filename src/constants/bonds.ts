import { LPBond } from "@services/helpers/bond/lp-bond";
import { CustomBond, StableBond } from '@services/helpers/bond/stable-bond';
import {
  // LpBondContract,
  // LpReserveContract,
  // WavaxBondContract,
  StableReserveContract,
  StableBondContract,
} from "@services/abi";
import { tokensIcons } from '@constants/tokens';

export const wFTM: StableBond = new StableBond({
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
export const USDC: StableBond = new StableBond({
  id: 'USDC',
  displayName: 'USDC',
  bondToken: 'USDC',
  bondIconSvg: tokensIcons.USDCIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  bondAddress: '0xFFf2fDd8Ff796cD3903b0CE550f0050172804215',
  tokensInStrategy: '0',
});
export const SCREAM: StableBond = new StableBond({
  id: 'SCREAM',
  displayName: 'SCREAM',
  bondToken: 'SCREAM',
  bondIconSvg: tokensIcons.SCREAMIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  bondAddress: '0x08dafdB796f7E95dD4f16f910Db84E3f9Ade7b99',
  tokensInStrategy: '0',
});
export const GEIST: StableBond = new StableBond({
  id: 'GEIST',
  displayName: 'GEIST',
  bondToken: 'GEIST',
  bondIconSvg: tokensIcons.GEISTIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  bondAddress: '0x85878783Fea0ED4d59c893634B3F836D69574929',
  tokensInStrategy: '0',
});
export const TSHARE: StableBond = new StableBond({
  id: 'TSHARE',
  displayName: 'TSHARE',
  bondToken: 'TSHARE',
  bondIconSvg: tokensIcons.TSHAREIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  bondAddress: '0xA2C549AA935bdD275429E02989b8888A68e47Bfc',
  tokensInStrategy: '0',
});
export const MULTI: StableBond = new StableBond({
  id: 'MULTI',
  displayName: 'MULTI',
  bondToken: 'MULTI',
  bondIconSvg: tokensIcons.MULTICHAINIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  bondAddress: '0x534fD86683b1012745070bb1d78aE0907C43d5d9',
  tokensInStrategy: '0',
});
export const BOO: StableBond = new StableBond({
  id: 'BOO',
  displayName: 'BOO',
  bondToken: 'BOO',
  bondIconSvg: tokensIcons.BOOIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  bondAddress: '0xFDED6d63356d130b363BefF73F01d05Cc5B196AD',
  tokensInStrategy: '0',
});
export const BIG_wFTM: StableBond = new StableBond({
  id: 'BIG_wFTM',
  displayName: 'BIG_wFTM',
  bondToken: 'BIG_wFTM',
  bondIconSvg: tokensIcons.BOOIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableReserveContract,
  bondAddress: '0xa0DEFC1F78C4bcCD402b8d0ED1089Ff9E2a58171',
  tokensInStrategy: '0',
  isLP: true,
});

export default <(StableBond | LPBond | CustomBond)[]>[
  wFTM, USDC, SCREAM, GEIST, TSHARE, MULTI, BOO, BIG_wFTM
];