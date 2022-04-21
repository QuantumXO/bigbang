import { IBlockchain } from '@models/blockchain';

export const AVAX_NETWORK: IBlockchain.INetwork = {
  id: 'AVAX',
  chainId: '43114',
  name: 'Avalanche',
  hexadecimalChainId: '0xa86a',
  chainName: 'Avalanche',
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
  nativeCurrency: {
    id: 'wAVAX',
    symbol: 'wAVAX',
    decimals: 18,
    address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  },
  tokens: [
    { id: 'USDC', address: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e', tokenNativeCurrencyLPAddress: '0xf4003F4efBE8691B60249E6afbD307aBE7758adb' },
    { id: 'JOE', address: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd', tokenNativeCurrencyLPAddress: '0x454E67025631C065d3cFAD6d71E6892f74487a15' },
    { id: 'LINK', address: '0x1EcAc9574b64190573F7663F30ec28e3c1501F28', tokenNativeCurrencyLPAddress: '0x6F3a0C89f611Ef5dC9d96650324ac633D02265D3' },
    { id: 'PTP', address: '0x22d4002028f537599bE9f666d1c4Fa138522f9c8', tokenNativeCurrencyLPAddress: '0xCDFD91eEa657cc2701117fe9711C9a4F61FEED23' },
    { id: 'SPELL', address: '0xCE1bFFBD5374Dac86a2893119683F4911a2F7814', tokenNativeCurrencyLPAddress: '0x62cf16BF2BC053E7102E2AC1DEE5029b94008d99' },
    { id: 'AAVE', address: '0x63a72806098Bd3D9520cC43356dD78afe5D386D9', tokenNativeCurrencyLPAddress: '0xc3e6D9f7a3A5E3e223356383C7C055Ee3F26A34F' },
    { id: 'wMEMO', address: '0x0da67235dD5787D67955420C84ca1cEcd4E5Bb3b', tokenNativeCurrencyLPAddress: '0x4d308C46EA9f234ea515cC51F16fba776451cac8' },
    { id: 'YEL', address: '0xADEF8406E3e15891Df4C1A9F3e6f090f11Cc327F', tokenNativeCurrencyLPAddress: '' },
  ],
  bondAddresses: {
    BIG_ADDRESS: '0x4e3776Daae6F7EfAc17Fcd56B87B44a9f3A557d7',
    BANG_ADDRESS: '0xEFca20421F82816f351FA4d8820D264b9F9e5d06',
    DYEL_ADDRESS: '0xF26FD20CE7b6C3FAe62FD0a5E5FAb29bAEA2DCaD',
    STAKING_ADDRESS: '0x54e7f3BD8B56C29d3762d8649B2323872C225415',
    STAKING_HELPER_ADDRESS: '0x4a1c2F9C383260878ee2dE005CE0d9543d8194c8',
    STAKING_WARMUP_ADDRESS: '0xAd486c318Be0A4f425978A377330Cc3db252FD7A',
    TREASURY_ADDRESS: '0x86420298279973ec955A37A5C134023Cc593E3ee',
    DISTRIBUTOR_ADDRESS: '0x3592B7a06103233E869610fdF05C45b8F4dA4b10',
    BONDING_CALC_ADDRESS: '0xFCEF16a8babAeC7A70152e7f748D28266cE79DAD',
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
  },
};

export default AVAX_NETWORK;