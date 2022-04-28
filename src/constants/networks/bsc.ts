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
    { id: 'USDC', address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', tokenNativeCurrencyLPAddress: '0xd99c7F6C65857AC913a8f880A4cb84032AB2FC5b' },
    { id: 'CAKE', address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', tokenNativeCurrencyLPAddress: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0' },
    { id: 'BIFI', address: '0xCa3F508B8e4Dd382eE878A314789373D80A5190A', tokenNativeCurrencyLPAddress: '0x3f1A9f3D9aaD8bD339eD4853F345d2eF89fbfE0c' },
    { id: 'UNI', address: '0xBf5140A22578168FD562DCcF235E5D43A02ce9B1', tokenNativeCurrencyLPAddress: '0x014608E87AF97a054C9a49f81E1473076D51d9a3' },
    { id: 'MBOX', address: '0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377', tokenNativeCurrencyLPAddress: '0x8FA59693458289914dB0097F5F366d771B7a7C3F' },
    { id: 'ALPACA', address: '0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F', tokenNativeCurrencyLPAddress: '0x1099C2E6Ed6ebA95099c205b599B409305783E43' },
    { id: 'STG', address: '0xB0D502E938ed5f4df2E681fE6E419ff29631d62b', tokenNativeCurrencyLPAddress: '0xBCEA09e9e882eC2Bb6dCE07c4e6669968846CaBD' },
    { id: 'YEL', address: '0xD3b71117E6C1558c1553305b44988cd944e97300', tokenNativeCurrencyLPAddress: '0x8290d3CA64f712de9FB7220353dAa55bf388F3A3' },
    { id: 'BIGwBNB', address: '0x8eE45472e0b26cA0F54e920339161AB7873e44bA', tokenNativeCurrencyLPAddress: '0x8eE45472e0b26cA0F54e920339161AB7873e44bA' },
  ],
  blockExplorerUrls: ['https://bscscan.com'],
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  bondAddresses: {
    BIG_ADDRESS: '0x116EBa2BafeB1e31034A588147B8A4b07Ffe2fB9',
    BANG_ADDRESS: '0xb919941F37aA0e1CF7F9BEa790283938603F40b5',
    DYEL_ADDRESS: '0x5F2BF6e76387B02aFea4e70cf2E6f0f43C65f39d',
    STAKING_ADDRESS: '0x1cf6b1F0fAabC417f0F24ae4f94D1f8dB7439861',
    STAKING_HELPER_ADDRESS: '0x96fAE58226917384197EfF0E4052b7b5BC17429c',
    STAKING_WARMUP_ADDRESS: '0xA4f868cdEc550180229aa7F4e28c0362C9d05DcF',
    TREASURY_ADDRESS: '0x2D9Ed93698B050d183Ac21f479F4B6525CFaCdBc',
    DISTRIBUTOR_ADDRESS: '0x4fA5035d7336e4f7468F3D278842a20dADb9CAcF',
    BONDING_CALC_ADDRESS: '0x9d2fF432Ec73Bc27E9455B3130174e6DE7F95200',
    REVERSE_BONDING_ADDRESS: '0x613037cBe167feF56bd1121cDb060488c9A90548',
    /////
    BUSD_ADDRESS: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
  },
};

export default BSC_NETWORK;