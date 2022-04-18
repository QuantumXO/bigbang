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
    { id: 'BIGwMATIC', address: '0xe0Ff4a185724F19a3D94c66fF35BaC77a8891399', tokenNativeCurrencyLPAddress: '0xe0Ff4a185724F19a3D94c66fF35BaC77a8891399' },
  ],
  rpcUrls: [
    'https://polygon-rpc.com/',
    'https://matic-mainnet.chainstacklabs.com',
    'https://matic-mainnet-full-rpc.bwarelabs.com',
    'https://poly-rpc.gateway.pokt.network',
  ],
  blockExplorerUrls: ['https://polygonscan.com/'],
  bondAddresses: {
    BIG_ADDRESS: '0x762Dbb1f8cf2f136F1bEfbaB43ca2157A342086c',
    BANG_ADDRESS: '0x59Cfc6693D92233f792C17fD509200528A3E1504',
    DYEL_ADDRESS: '0xfC41B1F6288f807A235C4380dB9457fb519Cee1B',
    STAKING_ADDRESS: '0xb08EF68aFCCEC0605b79033FEbEe854A807a6037',
    STAKING_HELPER_ADDRESS: '0x41f3730e3716696d132ba1b074809dd9035B35e2',
    STAKING_WARMUP_ADDRESS: '0x8413D13462c0FEFCc0cEdcd2A7aEdB36Ef368AB3',
    TREASURY_ADDRESS: '0x19690ffB3d94F012f6E7D5705D6EA82b70A831a8',
    DISTRIBUTOR_ADDRESS: '0x36C475903Afa25D333EE969C562236d439Bb7Fd7',
    BONDING_CALC_ADDRESS: '0xb1CE0c1efcf139cc79b9c8727A7ECD015fe46d31',
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
  },
};

export default MATIC_NETWORK;