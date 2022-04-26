import { Bond } from '@services/common/bond/bond';
import tokensIcons from '@constants/icons';

export const USDCInAVAX: Bond = new Bond({
  id: 'USDC',
  bondIcon: tokensIcons.USDC,
  bondAddress: '0x747B66a41b95A4597b082de621EBE340f8B38dc3',
  tokensInStrategy: '0',
  networkType: 'AVAX',
});
export const wAVAX: Bond = new Bond({
  id: 'wAVAX',
  bondIcon: tokensIcons.wAVAX,
  bondAddress: '0xDFc0a3DE50862761F0821a04812Af2b896d480e8',
  tokensInStrategy: '0',
  networkType: 'AVAX',
  isWrap: true,
});
export const BIGwAVAX: Bond = new Bond({
  id: 'BIGwAVAX',
  displayName: 'BIG_wAVAX',
  bondIcon: tokensIcons.BIG,
  bondLPIcon: tokensIcons.wAVAX,
  bondAddress: '0x484A6306DE3811709Ac64d59D2a98A89a1DeD0D0',
  tokensInStrategy: '0',
  networkType: 'AVAX',
  isLP: true,
});
export const JOE: Bond = new Bond({
  id: 'JOE',
  bondIcon: tokensIcons.JOE,
  bondAddress: '0x9c43E7DD78C55065C623d74fE7340B762dD0620E',
  tokensInStrategy: '0',
  networkType: 'AVAX',
});
export const LINK: Bond = new Bond({
  id: 'LINK',
  bondIcon: tokensIcons['LINK'],
  bondAddress: '0x335A27C101b3825C424A92BAf93086c4c570dF74',
  tokensInStrategy: '0',
  networkType: 'AVAX',
});
export const PTP: Bond = new Bond({
  id: 'PTP',
  bondIcon: tokensIcons.PTP,
  bondAddress: '0x8185327D73EAA27b390ff87820089DB2EC18f7b1',
  tokensInStrategy: '0',
  networkType: 'AVAX',
});
export const SPELL: Bond = new Bond({
  id: 'SPELL',
  bondIcon: tokensIcons.SPELL,
  bondAddress: '0xc67314aD303e15D0E24E935F1804cbc9F88eD74f',
  tokensInStrategy: '0',
  networkType: 'AVAX',
});
export const AAVE: Bond = new Bond({
  id: 'AAVE',
  bondIcon: tokensIcons.AAVE,
  bondAddress: '0xAaC9e9Bd843bB6B8b4Df17861fD26D284EB99e3C',
  tokensInStrategy: '0',
  networkType: 'AVAX',
});
export const wMEMO: Bond = new Bond({
  id: 'wMEMO',
  bondIcon: tokensIcons.AAVE,
  bondAddress: '0xA0e0e08Fa28FBF6eE0656a7803e5Ef65e6E54cA5',
  tokensInStrategy: '0',
  networkType: 'AVAX',
});
export const YEL: Bond = new Bond({
  id: 'YEL',
  bondIcon: tokensIcons.YEL,
  bondAddress: '0x3c4404ECD817edBe78881F134d21Fcca03fABc8a',
  tokensInStrategy: '0',
  networkType: 'AVAX',
});

export default <Bond[]>[
  USDCInAVAX, wAVAX, BIGwAVAX, JOE, LINK, PTP, SPELL, AAVE, wMEMO, YEL
];