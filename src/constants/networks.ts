import { IBlockchain } from '@models/blockchain';

// import ethNetworkIcon from '@assets/images/common/networks/eth_mainnet.svg';
// import binanceNetworkIcon from '@assets/images/common/networks/binance.svg';
import fantomNetworkIcon from '@assets/images/common/networks/fantom.svg';
import maticNetworkIcon from '@assets/images/common/networks/polygon_MATIC.svg';

export const FTM_NETWORK: IBlockchain.INetwork = {
  id: 'FTM',
  chainId: '250',
  chainName: 'FTM',
  name: 'Fantom',
  icon: fantomNetworkIcon,
  chainNetwork: 'mainnet',
  hexadecimalChainId: '0xFA',
  nativeCurrency: {
    id: 'wFTM',
    address: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
  },
  tokens: [
    { id: 'USDC', address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75' },
    { id: 'USDCwFTM', address: '0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c' },
    { id: 'BIGwFTM', address: '0x659BB25B9308bfA16F5ea8d452b9a2BbaE84F60F', tokenNativeCurrencyLPAddress: '0x659BB25B9308bfA16F5ea8d452b9a2BbaE84F60F' },
    { id: 'SCREAM', address: '0xe0654C8e6fd4D733349ac7E09f6f23DA256bF475', tokenNativeCurrencyLPAddress: '0x30872e4fc4edbfd7a352bfc2463eb4fae9c09086' },
    { id: 'GEIST', address: '0xd8321AA83Fb0a4ECd6348D4577431310A6E0814d', tokenNativeCurrencyLPAddress: '0x668ae94d0870230ac007a01b471d02b2c94ddcb9' },
    { id: 'TSHARE', address: '0x4cdF39285D7Ca8eB3f090fDA0C069ba5F4145B37', tokenNativeCurrencyLPAddress: '0x4733bc45ef91cf7ccecaeedb794727075fb209f2' },
    { id: 'MULTI', address: '0x9Fb9a33956351cf4fa040f65A13b835A3C8764E3', tokenNativeCurrencyLPAddress: '0x297c8990134bf1ee08ae5d8805042fbac8781201' },
    { id: 'BOO', address: '0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE', tokenNativeCurrencyLPAddress: '0xec7178f4c41f346b2721907f5cf7628e388a7a58' },
  ],
  rpcUrls: ['https://rpc.ftm.tools/'],
  blockExplorerUrls: ['https://ftmscan.com'],
  bondAddresses: {
    BIG_ADDRESS: '0xc3eE9aB0441923811c6432fae32d4310FBe01DE0',
    BANG_ADDRESS: '0xf87648c318A7F1a1Ae8Efc7aC524674A68f9a3ac',
    DYEL_ADDRESS: '0xA4f474c92621705dE140694D3761F3686E1D775E',
    STAKING_ADDRESS: '0xc42dcf2FD841C81363c7Bd3B49ac28B08e19599E',
    STAKING_HELPER_ADDRESS: '0x2C61bFCd16c5122be5881F76d358273cb39E1570',
    STAKING_WARMUP_ADDRESS: '0x64569c623E507Bd8B0779dA6B3d713c949d18783',
    TREASURY_ADDRESS: '0xaa4F0516e0899B6F8a97ee237cAbb3ec5aba0E95',
    DISTRIBUTOR_ADDRESS: '0xc021EaB1Cb5a0B4119C75fF4254e7802fA332C74',
    /////
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
    BONDING_CALC_ADDRESS: '0x0000000000000000000000000000000000000000',
    /////
  },
};

// Polygon (MATIC)
export const MATIC_NETWORK: IBlockchain.INetwork = {
  id: 'MATIC',
  chainId: '137',
  chainName: 'FTM',
  name: 'Matic',
  icon: maticNetworkIcon,
  chainNetwork: 'mainnet',
  hexadecimalChainId: '0x89',
  nativeCurrency: {
    id: 'wMATIC',
    address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  },
  tokens: [
    { id: 'USDC', address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' },
    { id: 'USDCwMATIC', address: '0x6e7a5fafcec6bb1e78bae2a1f0b612012bf14827' },
    { id: 'QUICK', address: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13', tokenNativeCurrencyLPAddress: '0x019ba0325f1988213d448b3472fa1cf8d07618d7' },
    { id: 'CRV', address: '0x172370d5Cd63279eFa6d502DAB29171933a610AF', tokenNativeCurrencyLPAddress: '0x369582d2010b6ed950b571f4101e3bb9b554876f' },
    { id: 'SAND', address: '0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683' },
    // { id: 'MANA', address: '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4' },
    { id: 'WETH', address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619' },
    { id: 'BIGwMATIC', address: '0xe0Ff4a185724F19a3D94c66fF35BaC77a8891399' },
  ],
  rpcUrls: ['https://polygon-rpc.com/'],
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
    /////
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
    BONDING_CALC_ADDRESS: '0x0000000000000000000000000000000000000000',
    /////
  },
};

/* export const ETH_NETWORK: IBlockchain.INetwork = {
  id: 'ETH',
  chainId: '1',
  name: 'Ethereum',
  isDisabled: true,
  stableTokenType: 'USDC',
  icon: ethNetworkIcon,
  hexadecimalChainId: '0x1',
  chainName: 'ETH Mainnet',
  blockExplorerUrls: ['https://etherscan.io'],
  bondAddresses: {
    BIG_ADDRESS: '0x0df1c7aF7079B8f80c1C4C0Fd8ece3d1D6b12DDA',
    BANG_ADDRESS: '0x43aBdF495a8979b7Ea347A5eDfFD97Bc06250d46',
    DYEL_ADDRESS: '0xc70c3Eb58D4619b2683a3f16d9aE0ad474b139cd',
    STAKING_ADDRESS: '0xdF8D9bC8088f03ADF14529A1b7d91FD66093d46d',
    STAKING_HELPER_ADDRESS: '0xD19CBe29aD8A0aDab95A465D7B70c4Fd10C153bc',
    STAKING_WARMUP_ADDRESS: '0xfbfACf5D7727b7f476322995F1AeD53113B4118d',
    TREASURY_ADDRESS: '0xF411118dbD6338aB40Fa8e3bF514596DbF1a7528',
    DISTRIBUTOR_ADDRESS: '0x627aC1904251F1e2Df5aCaefCE4547C66Ef64382',
    BONDING_CALC_ADDRESS: '0x0000000000000000000000000000000000000000',
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
  },
};
export const BNB_NETWORK: IBlockchain.INetwork = {
  id: 'BNB',
  chainId: '56',
  name: 'Binance',
  chainName: 'BSC',
  isDisabled: true,
  stableTokenType: 'USDC',
  icon: binanceNetworkIcon,
  hexadecimalChainId: '0x38',
  chainNetwork: 'mainnet',
  rpcUrls: ['https://bsc-dataseed1.binance.org'],
  bondAddresses: {
    BIG_ADDRESS: '0x0df1c7aF7079B8f80c1C4C0Fd8ece3d1D6b12DDA',
    BANG_ADDRESS: '0x43aBdF495a8979b7Ea347A5eDfFD97Bc06250d46',
    DYEL_ADDRESS: '0xc70c3Eb58D4619b2683a3f16d9aE0ad474b139cd',
    STAKING_ADDRESS: '0xdF8D9bC8088f03ADF14529A1b7d91FD66093d46d',
    STAKING_HELPER_ADDRESS: '0xD19CBe29aD8A0aDab95A465D7B70c4Fd10C153bc',
    STAKING_WARMUP_ADDRESS: '0xfbfACf5D7727b7f476322995F1AeD53113B4118d',
    TREASURY_ADDRESS: '0xF411118dbD6338aB40Fa8e3bF514596DbF1a7528',
    DISTRIBUTOR_ADDRESS: '0x627aC1904251F1e2Df5aCaefCE4547C66Ef64382',
    BONDING_CALC_ADDRESS: '0x0000000000000000000000000000000000000000',
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
  },
}; */
/* export const AVAX_NETWORK: IBlockchain.INetwork = {
  id: 'AVAX',
  chainId: '43114',
  name: 'AVAX',
  isDisabled: true,
  stableTokenType: 'USDC',
  hexadecimalChainId: '0xa86a',
  chainName: 'Avalanche Mainnet',
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
  nativeCurrency: {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18
  },
  bondAddresses: {
    BIG_ADDRESS: '0x0df1c7aF7079B8f80c1C4C0Fd8ece3d1D6b12DDA',
    BANG_ADDRESS: '0x43aBdF495a8979b7Ea347A5eDfFD97Bc06250d46',
    DYEL_ADDRESS: '0xc70c3Eb58D4619b2683a3f16d9aE0ad474b139cd',
    STAKING_ADDRESS: '0xdF8D9bC8088f03ADF14529A1b7d91FD66093d46d',
    STAKING_HELPER_ADDRESS: '0xD19CBe29aD8A0aDab95A465D7B70c4Fd10C153bc',
    STAKING_WARMUP_ADDRESS: '0xfbfACf5D7727b7f476322995F1AeD53113B4118d',
    TREASURY_ADDRESS: '0xF411118dbD6338aB40Fa8e3bF514596DbF1a7528',
    DISTRIBUTOR_ADDRESS: '0x627aC1904251F1e2Df5aCaefCE4547C66Ef64382',
    BONDING_CALC_ADDRESS: '0x0000000000000000000000000000000000000000',
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
  },
}; */

export const TOKEN_DECIMALS: number = 9;
export const DEFAULT_NETWORK = FTM_NETWORK;
export const NETWORKS: IBlockchain.INetwork[] = [FTM_NETWORK, MATIC_NETWORK];
export const ACTIVE_NETWORKS: IBlockchain.INetwork[] = NETWORKS
  .filter(({ isDisabled }: IBlockchain.INetwork) => !isDisabled);
export const SUPPORTED_NETWORKS_CHAIN_IDS: string[] = ACTIVE_NETWORKS.map(({ chainId }:IBlockchain.INetwork) => chainId);
