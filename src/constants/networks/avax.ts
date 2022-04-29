import { IBlockchain } from '@models/blockchain';

export const AVAX_NETWORK: IBlockchain.INetwork = {
  id: 'AVAX',
  chainId: '43114',
  name: 'Avalanche',
  hexadecimalChainId: '0xA86A',
  chainName: 'Avalanche',
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://snowtrace.io/'],
  nativeCurrency: {
    id: 'wAVAX',
    symbol: 'wAVAX',
    decimals: 18,
    address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  },
  tokens: [
    { id: 'USDC', address: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e', tokenNativeCurrencyLPAddress: '0xf4003F4efBE8691B60249E6afbD307aBE7758adb' },
    { id: 'JOE', address: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd', tokenNativeCurrencyLPAddress: '0x454E67025631C065d3cFAD6d71E6892f74487a15' },
    { id: 'LINK', address: '0x5947BB275c521040051D82396192181b413227A3', tokenNativeCurrencyLPAddress: '0x6F3a0C89f611Ef5dC9d96650324ac633D02265D3' },
    { id: 'PTP', address: '0x22d4002028f537599bE9f666d1c4Fa138522f9c8', tokenNativeCurrencyLPAddress: '0xCDFD91eEa657cc2701117fe9711C9a4F61FEED23' },
    { id: 'SPELL', address: '0xCE1bFFBD5374Dac86a2893119683F4911a2F7814', tokenNativeCurrencyLPAddress: '0x62cf16BF2BC053E7102E2AC1DEE5029b94008d99' },
    { id: 'AAVE', address: '0x63a72806098Bd3D9520cC43356dD78afe5D386D9', tokenNativeCurrencyLPAddress: '0xc3e6D9f7a3A5E3e223356383C7C055Ee3F26A34F' },
    { id: 'wMEMO', address: '0x0da67235dD5787D67955420C84ca1cEcd4E5Bb3b', tokenNativeCurrencyLPAddress: '0x4d308C46EA9f234ea515cC51F16fba776451cac8' },
    { id: 'YEL', address: '0xc5E7520432EbDBf0a610287Ac45fc231876f5E99', tokenNativeCurrencyLPAddress: '0x00A386aFB1524B572dE7Ea0A3aaaD25cDf7e749a' },
    { id: 'BIGwAVAX', address: '0x28bcA082832f5cFf7f8CF632CA71790B21a6EEF3', tokenNativeCurrencyLPAddress: '0x28bcA082832f5cFf7f8CF632CA71790B21a6EEF3' },
  ],
  bondAddresses: {
    BIG_ADDRESS: '0x7ce5DB1b99855BE3505D15d510df85fB3e87be39',
    BANG_ADDRESS: '0x27143aF2E93133f6b85DAffCFB7237C720693539',
    DYEL_ADDRESS: '0x09769d6121D3a901234237647ed651C270C9a2E5',
    STAKING_ADDRESS: '0xfe4dA44820b7d7Cb5Fe3D499829cD6773Fa13b8a',
    STAKING_HELPER_ADDRESS: '0xDf4C4c7C05E97cB7DDae3CbAa5e00a00b6F3E468',
    STAKING_WARMUP_ADDRESS: '0x288cB7a6c5c7efD2420D9eF4a7ac9d19F3099633',
    TREASURY_ADDRESS: '0xB4F48Ea9c835C0f4b5af075D64a397DD84c27D5A',
    DISTRIBUTOR_ADDRESS: '0x39C0dc23a7dFFaA7c81c6B00522890D425622555',
    BONDING_CALC_ADDRESS: '0xa9B79a8eaEFe5D7b711839b598B872f621bCc10C',
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
    REVERSE_BONDING_ADDRESS: '0x22cdB8BE514d45fD0960C3E389238b4fd3d52307',
  },
};

export default AVAX_NETWORK;