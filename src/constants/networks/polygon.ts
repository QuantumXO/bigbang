import { IBlockchain } from '@models/blockchain';
import maticNetworkIcon from '@assets/images/common/networks/polygon_MATIC.svg';

// Polygon (MATIC)
const MATIC_NETWORK: IBlockchain.INetwork = {
  id: 'MATIC',
  chainId: '137',
  chainName: 'Polygon',
  name: 'Polygon',
  icon: maticNetworkIcon,
  hexadecimalChainId: '0x89',
  nativeCurrency: {
    id: 'wMATIC',
    decimals: 18,
    symbol: 'wMATIC',
    address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  },
  tokens: [
    { id: 'USDC', address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', tokenNativeCurrencyLPAddress: '0x6e7a5fafcec6bb1e78bae2a1f0b612012bf14827' },
    { id: 'QUICK', address: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13', tokenNativeCurrencyLPAddress: '0x019ba0325f1988213d448b3472fa1cf8d07618d7' },
    { id: 'CRV', address: '0x172370d5Cd63279eFa6d502DAB29171933a610AF', tokenNativeCurrencyLPAddress: '0x172370d5Cd63279eFa6d502DAB29171933a610AF' },
    { id: 'SAND', address: '0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683', tokenNativeCurrencyLPAddress: '0x369582d2010b6ed950b571f4101e3bb9b554876f' },
    { id: 'ORBS', address: '0x614389EaAE0A6821DC49062D56BDA3d9d45Fa2ff', tokenNativeCurrencyLPAddress: '0xb2b6d423e535b57aad06e9866803b95fb66152ea' },
    { id: 'YEL', address: '0xD3b71117E6C1558c1553305b44988cd944e97300', tokenNativeCurrencyLPAddress: '0x8bab87ecf28bf45507bd745bc70532e968b5c2de' },
    { id: 'QI', address: '0x580a84c73811e1839f75d86d75d88cca0c241ff4', tokenNativeCurrencyLPAddress: '0x9a8b2601760814019b7e6ee0052e25f1c623d1e6' },
    { id: 'BIGwMATIC', address: '0xfAfB8EaFD75530Ca3b5ea6E08f8A271891Aea974', tokenNativeCurrencyLPAddress: '0xfAfB8EaFD75530Ca3b5ea6E08f8A271891Aea974' },
  ],
  rpcUrls: [
    'https://polygon-rpc.com/',
    'https://matic-mainnet.chainstacklabs.com',
    'https://matic-mainnet-full-rpc.bwarelabs.com',
    'https://poly-rpc.gateway.pokt.network',
  ],
  blockExplorerUrls: ['https://polygonscan.com/'],
  bondAddresses: {
    BIG_ADDRESS: '0x9FDfDD79dD8FaB16B3F4223DEDC5f76decDD8466',
    BANG_ADDRESS: '0xA5aDE4EAC20a1F1f90a51E5eaA2852D8ea098C89',
    DYEL_ADDRESS: '0x7De59e316e0B4ec71bbFFB643821BAe09A0702c0',
    STAKING_ADDRESS: '0x446a447f5B7bC4D1B23b7510a5DD9d1CbAf835fb',
    STAKING_HELPER_ADDRESS: '0x584f21AeE241dbf21e5D3F4428E9Cd9BB4890b61',
    STAKING_WARMUP_ADDRESS: '0x6E27B457644e2f4211571EcE063FcB3FbA956616',
    TREASURY_ADDRESS: '0x5ba98387005Dd4f9e4B4bC25045ff248eFa7fF45',
    DISTRIBUTOR_ADDRESS: '0xa89556A8972Ced48A93aB5e67cf5931A0eD144C9',
    BONDING_CALC_ADDRESS: '0xecD28a437966eF0f879f9E04f5e50e9b835bAB30',
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
    REVERSE_BONDING_ADDRESS: '0x12F1c022488D5dCf0cbd46F889d4Ed841FF19bB0',
  },
};

export default MATIC_NETWORK;