import { IBlockchain } from '@models/blockchain';

export const ETH_NETWORK: IBlockchain.INetwork = {
  id: 'ETH',
  chainId: '1',
  isDisabled: true,
  name: 'Ethereum',
  hexadecimalChainId: '0x1',
  chainName: 'Ethereum',
  blockExplorerUrls: ['https://etherscan.io'],
  nativeCurrency: {
    id: 'wETH',
    symbol: 'wETH',
    decimals: 18,
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  },
  tokens: [
    { id: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', tokenNativeCurrencyLPAddress: '0x397FF1542f962076d0BFE58eA045FfA2d347ACa0' },
    { id: 'SUSHI', address: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2', tokenNativeCurrencyLPAddress: '0x795065dCc9f64b5614C407a6EFDC400DA6221FB0' },
    { id: 'CVX', address: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B', tokenNativeCurrencyLPAddress: '0x05767d9EF41dC40689678fFca0608878fb3dE906' },
    { id: 'YFI', address: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', tokenNativeCurrencyLPAddress: '0x088ee5007C98a9677165D78dD2109AE4a3D04d0C' },
    { id: 'ALCX', address: '0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF', tokenNativeCurrencyLPAddress: '0xC3f279090a47e80990Fe3a9c30d24Cb117EF91a8' },
    { id: 'AAVE', address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9', tokenNativeCurrencyLPAddress: '0xD75EA151a61d06868E31F8988D28DFE5E9df57B4' },
    { id: 'UNI', address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', tokenNativeCurrencyLPAddress: '0xDafd66636E2561b0284EDdE37e42d192F2844D40' },
    { id: 'MKR', address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', tokenNativeCurrencyLPAddress: '0xBa13afEcda9beB75De5c56BbAF696b880a5A50dD' },
    { id: 'COMP', address: '0xc00e94Cb662C3520282E6f5717214004A7f26888', tokenNativeCurrencyLPAddress: '0x31503dcb60119A812feE820bb7042752019F2355' },
    { id: 'SPELL', address: '0x090185f2135308BaD17527004364eBcC2D37e5F6', tokenNativeCurrencyLPAddress: '0xb5De0C3753b6E1B4dBA616Db82767F17513E6d4E' },
    { id: 'YEL', address: '0x7815bDa662050D84718B988735218CFfd32f75ea', tokenNativeCurrencyLPAddress: '0xc83cE8612164eF7A13d17DDea4271DD8e8EEbE5d' },
    { id: 'CRV', address: '0xD533a949740bb3306d119CC777fa900bA034cd52', tokenNativeCurrencyLPAddress: '0x58Dc5a51fE44589BEb22E8CE67720B5BC5378009' },
    { id: 'FARM', address: '0xa0246c9032bC3A600820415aE600c6388619A14D', tokenNativeCurrencyLPAddress: '0x56feAccb7f750B997B36A68625C7C596F0B41A58' },
    { id: 'BAL', address: '0xba100000625a3754423978a60c9317c58a424e3D', tokenNativeCurrencyLPAddress: '0xA70d458A4d9Bc0e6571565faee18a48dA5c0D593' },
    { id: 'BIGwETH', address: '', tokenNativeCurrencyLPAddress: '' },
  ],
  bondAddresses: {
    BIG_ADDRESS: '',
    BANG_ADDRESS: '',
    DYEL_ADDRESS: '',
    STAKING_ADDRESS: '',
    STAKING_HELPER_ADDRESS: '',
    STAKING_WARMUP_ADDRESS: '',
    TREASURY_ADDRESS: '',
    DISTRIBUTOR_ADDRESS: '',
    BONDING_CALC_ADDRESS: '',
    ZAPIN_ADDRESS: '',
    REVERSE_BONDING_ADDRESS: '0x0000000000000000000000000000000000000000',
  },
};

export default ETH_NETWORK;
