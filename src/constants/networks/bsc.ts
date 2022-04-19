import { IBlockchain } from '@models/blockchain';
import binanceNetworkIcon from '@assets/images/common/networks/binance.svg';

const BSC_NETWORK: IBlockchain.INetwork = {
  id: 'BSC',
  chainId: '56',
  chainName: 'Binance Smart Chain',
  name: 'Binance',
  icon: binanceNetworkIcon,
  hexadecimalChainId: '0x38',
  nativeCurrency: {
    id: 'wBNB',
    symbol: 'wBNB',
    decimals: 18,
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  },
  tokens: [
    { id: 'USDC', address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', tokenNativeCurrencyLPAddress: '' },
    { id: 'CAKE', address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', tokenNativeCurrencyLPAddress: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0' },
    { id: 'BIFI', address: '0xCa3F508B8e4Dd382eE878A314789373D80A5190A', tokenNativeCurrencyLPAddress: '0x3f1A9f3D9aaD8bD339eD4853F345d2eF89fbfE0c' },
    { id: 'UNI', address: '0xBf5140A22578168FD562DCcF235E5D43A02ce9B1', tokenNativeCurrencyLPAddress: '0x014608E87AF97a054C9a49f81E1473076D51d9a3' },
    { id: 'MBOX', address: '0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377', tokenNativeCurrencyLPAddress: '0x8FA59693458289914dB0097F5F366d771B7a7C3F' },
    { id: 'ALPACA', address: '0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F', tokenNativeCurrencyLPAddress: '0x1099C2E6Ed6ebA95099c205b599B409305783E43' },
    { id: 'STG', address: '0xB0D502E938ed5f4df2E681fE6E419ff29631d62b', tokenNativeCurrencyLPAddress: '0xBCEA09e9e882eC2Bb6dCE07c4e6669968846CaBD' },
    { id: 'YEL', address: '0xD3b71117E6C1558c1553305b44988cd944e97300', tokenNativeCurrencyLPAddress: '0x8290d3CA64f712de9FB7220353dAa55bf388F3A3' },
    { id: 'BIGwBNB', address: '0xcc0561A6DBC5b1211805fA6f5A2BCf893583E6D0', tokenNativeCurrencyLPAddress: '0xcc0561A6DBC5b1211805fA6f5A2BCf893583E6D0' },
  ],
  blockExplorerUrls: ['https://bscscan.com'],
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  bondAddresses: {
    BIG_ADDRESS: '0x8dDAEd0feF05C12486ab0b6a37F3D07eDfFe0188',
    BANG_ADDRESS: '0x84B7CAddCA009451fFd098DF3b68F37c025C36b1',
    DYEL_ADDRESS: '0x123189767F287162c750d6F3Eb3384eB62639DF8',
    STAKING_ADDRESS: '0xc9512E0f5cCdB83cE50881025818CeFB47290EfC',
    STAKING_HELPER_ADDRESS: '0x33e6b324a6d82e97211465e60Cb0d7558B406dB9',
    STAKING_WARMUP_ADDRESS: '0x13DEb2A74Dc61B557dC8d52e97806956C2FDB746',
    TREASURY_ADDRESS: '0xd1CBd4c63384B9BCB688aA9A86026d2F54ac92f8',
    DISTRIBUTOR_ADDRESS: '0x38811F20325F688B18025C501040cD2424CBa0Ee',
    BONDING_CALC_ADDRESS: '0x1F18C546C2662845Ee0808BB28A739327f5C7395',
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
  },
};

export default BSC_NETWORK;