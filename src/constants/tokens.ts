// import ApeXIcon from "@assets/images/tokens/Ape-X.png";
// import ApeinIcon from "@assets/images/tokens/APEIN.png";
// import BifiIcon from "@assets/images/tokens/BIFI.png";
// import BlizzIcon from "@assets/images/tokens/BLIZZ.png";
// import BoofiIcon from "@assets/images/tokens/BOOFI.png";
// import ChartIcon from "@assets/images/tokens/CHART.png";
// import DaiEIcon from "@assets/images/tokens/DAI.e.png";
// import DreggIcon from "@assets/images/tokens/DREGG.png";
// import SynIcon from "@assets/images/tokens/SYN.png";
// import TeddyIcon from "@assets/images/tokens/TEDDY.png";
// import TimeIcon from "@assets/images/tokens/TIME.svg";
// import TsdIcon from "@assets/images/tokens/TSD.png";
// import VsoIcon from "@assets/images/tokens/VSO.png";
// import WBtcIcon from "@assets/images/tokens/WBTC.e.png";
// import WetIcon from "@assets/images/tokens/WET.png";
// import XavaIcon from "@assets/images/tokens/XAVA.png";
// import YakIcon from "@assets/images/tokens/YAK.png";
// import UsdtEIcon from "@assets/images/tokens/USDT.e.png";
// import AaveIcon from "@assets/images/tokens/AAVE.e.png";
// import BnbIcon from "@assets/images/tokens/BNB.png";
// import EleIcon from "@assets/images/tokens/ELE.png";
// import ElkIcon from "@assets/images/tokens/ELK.png";
// import FraxIcon from "@assets/images/tokens/FRAX.png";
// import GbIcon from "@assets/images/tokens/GB.png";
// import HatIcon from "@assets/images/tokens/HAT.png";
// import HuskyIcon from "@assets/images/tokens/HUSKY.png";
// import IceIcon from "@assets/images/tokens/ICE.png";
// import JoeIcon from "@assets/images/tokens/JOE.png";
// import KloIcon from "@assets/images/tokens/KLO.png";
// import LinkEIcon from "@assets/images/tokens/LINK.e.png";
// import MainIcon from "@assets/images/tokens/MAI.png";
// import MimIcon from "@assets/images/tokens/MIM.svg";
// import MYakIcon from "@assets/images/tokens/mYAK.png";
// import OliveIcon from "@assets/images/tokens/OLIVE.png";
// import PefiIcon from "@assets/images/tokens/PEFI.png";
// import PngIcon from "@assets/images/tokens/PNG.png";
// import QiIcon from "@assets/images/tokens/QI.png";
// import RelayIcon from "@assets/images/tokens/RELAY.png";
// import SherpaIcon from "@assets/images/tokens/SHERPA.png";
// import ShibxIcon from "@assets/images/tokens/SHIBX.png";
// import SingIcon from "@assets/images/tokens/SING.png";
// import SnobIcon from "@assets/images/tokens/SNOB.png";
// import SpellIcon from "@assets/images/tokens/SPELL.png";
// import SushiEIcon from "@assets/images/tokens/SUSHI.e.png";
// import WethEIcon from "@assets/images/tokens/WETH.e.png";
// import WavaxIcon from "@assets/images/tokens/WAVAX.png";
// import UsdcEIcon from "@assets/images/tokens/USDC.e.png";
import AvaxIcon from "@assets/images/tokens/AVAX.svg";
import FTMIcon from "@assets/images/common/tokens/ftm.svg";
import { IBlockchain } from '@models/blockchain';

export interface ITokenAsset extends Pick<
  IBlockchain.IToken,
  'id' | 'icon' | 'decimals' | 'name' | 'isWrap' | 'isLP' | 'isStable'
  > {
  id: IBlockchain.WTF_TokenType;
  icon: string;
  decimals: number;
  name: IBlockchain.WTF_TokenNameType;
  isWrap?: boolean;
  isLP?: boolean;
  isStable?: boolean;
}

export const wftm: ITokenAsset = {
  id: "wFTM",
  icon: FTMIcon,
  decimals: 18,
  name: 'wFTM',
  isWrap: true,
};
export const ftm: ITokenAsset = {
  id: "FTM",
  icon: FTMIcon,
  decimals: 18,
  name: 'FTM',
};
export const usdcWftm: ITokenAsset = {
  id: "USDCwFTM",
  icon: AvaxIcon,
  decimals: 18,
  name: 'USDCwFTM',
};
export const usdc: ITokenAsset = {
  id: "USDC",
  icon: AvaxIcon,
  decimals: 6,
  name: 'USDC',
};
export const bigWftm: ITokenAsset = {
  id: "BIG_wFTM",
  icon: AvaxIcon,
  decimals: 18,
  name: 'BIG_wFTM',
};

/* export const avax: ITokenAsset = {
  id: "AVAX",
  icon: AvaxIcon,
  decimals: 18
};
const aave: ITokenAsset = {
  id: "AAVE.e",
  icon: AaveIcon,
  decimals: 18
}; */
/* const apeX: ITokenAsset = {
  id: "APE-X",
  address: "0xd039C9079ca7F2a87D632A9C0d7cEa0137bAcFB5",
  icon: ApeXIcon,
  decimals: 9
}; */
/* const apein: ITokenAsset = {
  id: "APEIN",
  address: "0x938FE3788222A74924E062120E7BFac829c719Fb",
  icon: ApeinIcon,
  decimals: 18
}; */
/* const bifi: ITokenAsset = {
  id: "BIFI",
  address: "0xd6070ae98b8069de6B494332d1A1a81B6179D960",
  icon: BifiIcon,
  decimals: 18
}; */
/* const blizz: ITokenAsset = {
  id: "BLIZZ",
  address: "0xB147656604217a03Fe2c73c4838770DF8d9D21B8",
  icon: BlizzIcon,
  decimals: 18
}; */
/* const bnb: ITokenAsset = {
  id: "BNB",
  icon: BnbIcon,
  decimals: 18
}; */
/* const boofi: ITokenAsset = {
  id: "BOOFI",
  address: "0xB00F1ad977a949a3CCc389Ca1D1282A2946963b0",
  icon: BoofiIcon,
  decimals: 18
}; */
/* const chart: ITokenAsset = {
  id: "CHART",
  address: "0xD769bDFc0CaEe933dc0a047C7dBad2Ec42CFb3E2",
  icon: ChartIcon,
  decimals: 18
}; */
/* const dai: ITokenAsset = {
  id: "DAI.e",
  address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
  icon: DaiEIcon,
  decimals: 18
}; */
/* const dregg: ITokenAsset = {
  id: "DREGG",
  address: "0x88c090496125b751B4E3ce4d3FDB8E47DD079c57",
  icon: DreggIcon,
  decimals: 18
}; */
/* const ele: ITokenAsset = {
  id: "ELE",
  icon: EleIcon,
  decimals: 18
};
const elk: ITokenAsset = {
  id: "ELK",
  icon: ElkIcon,
  decimals: 18
};
const frax: ITokenAsset = {
  id: "FRAX",
  icon: FraxIcon,
  decimals: 18
};
const gb: ITokenAsset = {
  id: "GB",
  icon: GbIcon,
  decimals: 9
};
const hat: ITokenAsset = {
  id: "HAT",
  icon: HatIcon,
  decimals: 18
};
const husky: ITokenAsset = {
  id: "HUSKY",
  icon: HuskyIcon,
  decimals: 18
};
const ice: ITokenAsset = {
  id: "ICE",
  icon: IceIcon,
  decimals: 18
};
const joe: ITokenAsset = {
  id: "JOE",
  icon: JoeIcon,
  decimals: 18
};
const klo: ITokenAsset = {
  id: "KLO",
  icon: KloIcon,
  decimals: 18
};
const link: ITokenAsset = {
  id: "LINK.e",
  icon: LinkEIcon,
  decimals: 18
};
const mai: ITokenAsset = {
  id: "MAI",
  icon: MainIcon,
  decimals: 18
};
export const mim: ITokenAsset = {
  id: "MIM",
  icon: MimIcon,
  decimals: 18
};
const myak: ITokenAsset = {
  id: "mYAK",
  icon: MYakIcon,
  decimals: 12
};
const olive: ITokenAsset = {
  id: "OLIVE",
  icon: OliveIcon,
  decimals: 18
};
const pefi: ITokenAsset = {
  id: "PEFI",
  icon: PefiIcon,
  decimals: 18
};
const png: ITokenAsset = {
  id: "PNG",
  icon: PngIcon,
  decimals: 18
};
const qi: ITokenAsset = {
  id: "QI",
  icon: QiIcon,
  decimals: 18
};
const relay: ITokenAsset = {
  id: "RELAY",
  icon: RelayIcon,
  decimals: 18
};
const sherpa: ITokenAsset = {
  id: "SHERPA",
  icon: SherpaIcon,
  decimals: 18
};
const shibx: ITokenAsset = {
  id: "SHIBX",
  icon: ShibxIcon,
  decimals: 18
};
const sing: ITokenAsset = {
  id: "SING",
  icon: SingIcon,
  decimals: 18
};
const snob: ITokenAsset = {
  id: "SNOB",
  icon: SnobIcon,
  decimals: 18
};
const spell: ITokenAsset = {
  id: "SPELL",
  icon: SpellIcon,
  decimals: 18
};
const sushi: ITokenAsset = {
  id: "SUSHI.e",
  icon: SushiEIcon,
  decimals: 18
};
const usdc: ITokenAsset = {
  id: "USDC.e",
  icon: UsdcEIcon,
  decimals: 6
};
const usdt: ITokenAsset = {
  id: "USDT.e",
  icon: UsdtEIcon,
  decimals: 6
};
export const wavax: ITokenAsset = {
  id: "WAVAX",
  icon: WavaxIcon,
  decimals: 18
};
const weth: ITokenAsset = {
  id: "WETH.e",
  icon: WethEIcon,
  decimals: 18
}; */

export default <ITokenAsset[]>[
  wftm,
  ftm,
  usdc,
  usdcWftm,
  bigWftm,
  /* avax,
  aave,
  bnb,
  joe,
  link,
  sing, // #TODO check
  spell,
  sushi,
  usdc,
  weth, */
];
