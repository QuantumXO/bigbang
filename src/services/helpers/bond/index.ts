import { IBlockchain } from '@models/blockchain';
import { LPBond } from "./lp-bond";
import { StableBond } from "./stable-bond";
import { IAllBondData } from '@services/hooks/bonds';
import {
  // LpBondContract,
  // LpReserveContract,
  // StableReserveContract,
  // WavaxBondContract,
  StableBondContract,
} from "@services/abi";

import AvaxIcon from "@assets/images/tokens/AVAX.svg";

export const ftm: StableBond = new StableBond({
  name: 'ftm',
  displayName: 'wFTM',
  bondToken: 'wFTM',
  bondIconSvg: AvaxIcon,
  bondContractABI: StableBondContract,
  reserveContractAbi: StableBondContract,
  networkAddresses: {
    [IBlockchain.NetworksEnum.FTM]: {
      bondAddress: "0xc8654069E1D103062ef67C9492277f56caaaC26d",
      reserveAddress: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83"
    },
  },
  tokensInStrategy: '0',
});

export default <any[]>[ftm];

/* export const wavax: CustomBond = new CustomBond({
 name: "wavax",
 displayName: "wAVAX",
 bondToken: "AVAX",
 bondIconSvg: AvaxIcon,
 bondContractABI: WavaxBondContract,
 reserveContractAbi: StableReserveContract,
 networkAddresses: {
 [IBlockchain.NetworksEnum.FTM]: {
 bondAddress: "0xE02B1AA2c4BE73093BE79d763fdFFC0E3cf67318",
 reserveAddress: "0xE02B1AA2c4BE73093BE79d763fdFFC0E3cf67318"
 },
 [IBlockchain.NetworksEnum.BNB]: {
 bondAddress: "0xE02B1AA2c4BE73093BE79d763fdFFC0E3cf67318",
 reserveAddress: "0xE02B1AA2c4BE73093BE79d763fdFFC0E3cf67318"
 },
 [IBlockchain.NetworksEnum.MATIC]: {
 bondAddress: "0xE02B1AA2c4BE73093BE79d763fdFFC0E3cf67318",
 reserveAddress: "0xE02B1AA2c4BE73093BE79d763fdFFC0E3cf67318"
 },
 [IBlockchain.NetworksEnum.ETH]: {
 bondAddress: "0xE02B1AA2c4BE73093BE79d763fdFFC0E3cf67318",
 reserveAddress: "0xE02B1AA2c4BE73093BE79d763fdFFC0E3cf67318"
 },
 },
 tokensInStrategy: "756916000000000000000000"
 }); */

/*export const mim = new StableBond({
 name: "mim",
 displayName: "MIM",
 bondToken: "MIM",
 bondIconSvg: MimIcon,
 bondContractABI: StableBondContract,
 reserveContractAbi: StableReserveContract,
 networkAddresses: {
 [Networks.AVAX]: {
 bondAddress: "0x694738E0A438d90487b4a549b201142c1a97B556",
 reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D"
 }
 },
 tokensInStrategy: "60500000000000000000000000"
 });*/

/*export const mimTime = new LPBond({
 name: "mim_time_lp",
 displayName: "TIME-MIM LP",
 bondToken: "MIM",
 bondIconSvg: MimTimeIcon,
 bondContractABI: LpBondContract,
 reserveContractAbi: LpReserveContract,
 networkAddresses: {
 [Networks.AVAX]: {
 bondAddress: "0xA184AE1A71EcAD20E822cB965b99c287590c4FFe",
 reserveAddress: "0x113f413371fc4cc4c9d6416cf1de9dfd7bf747df"
 }
 },
 lpUrl: "https://www.traderjoexyz.com/#/pool/0x130966628846BFd36ff31a822705796e8cb8C18D/0xb54f16fB19478766A268F172C9480f8da1a7c9C3"
 });*/

/*export const avaxTime = new CustomLPBond({
 name: "avax_time_lp",
 displayName: "TIME-AVAX LP",
 bondToken: "AVAX",
 bondIconSvg: AvaxTimeIcon,
 bondContractABI: LpBondContract,
 reserveContractAbi: LpReserveContract,
 networkAddresses: {
 [Networks.AVAX]: {
 bondAddress: "0xc26850686ce755FFb8690EA156E5A6cf03DcBDE1",
 reserveAddress: "0xf64e1c5B6E17031f5504481Ac8145F4c3eab4917"
 }
 },
 lpUrl: "https://www.traderjoexyz.com/#/pool/AVAX/0xb54f16fB19478766A268F172C9480f8da1a7c9C3"
 });*/