import { IBlockchain } from '@models/blockchain';
import fantomNetworkIcon from '@assets/images/common/networks/fantom.svg';

const FTM_NETWORK: IBlockchain.INetwork = {
  id: 'FTM',
  chainId: '250',
  chainName: 'Fantom',
  name: 'Fantom',
  icon: fantomNetworkIcon,
  hexadecimalChainId: '0xFA',
  nativeCurrency: {
    id: 'wFTM',
    symbol: 'wFTM',
    decimals: 18,
    address: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
  },
  tokens: [
    { id: 'USDC', address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', tokenNativeCurrencyLPAddress: '0x2b4c76d0dc16be1c31d4c1dc53bf9b45987fc75c' },
    { id: 'SCREAM', address: '0xe0654C8e6fd4D733349ac7E09f6f23DA256bF475', tokenNativeCurrencyLPAddress: '0x30872e4fc4edbfd7a352bfc2463eb4fae9c09086' },
    { id: 'GEIST', address: '0xd8321AA83Fb0a4ECd6348D4577431310A6E0814d', tokenNativeCurrencyLPAddress: '0x668ae94d0870230ac007a01b471d02b2c94ddcb9' },
    { id: 'TSHARE', address: '0x4cdF39285D7Ca8eB3f090fDA0C069ba5F4145B37', tokenNativeCurrencyLPAddress: '0x4733bc45ef91cf7ccecaeedb794727075fb209f2' },
    { id: 'MULTI', address: '0x9Fb9a33956351cf4fa040f65A13b835A3C8764E3', tokenNativeCurrencyLPAddress: '0x297c8990134bf1ee08ae5d8805042fbac8781201' },
    { id: 'BOO', address: '0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE', tokenNativeCurrencyLPAddress: '0xec7178f4c41f346b2721907f5cf7628e388a7a58' },
    { id: 'YEL', address: '0xd3b71117e6c1558c1553305b44988cd944e97300', tokenNativeCurrencyLPAddress: '0x8bff7b8b6a14e576a3634d6c0466a19a6e9b170a' },
    { id: 'BEETS', address: '0xf24bcf4d1e507740041c9cfd2dddb29585adce1e', tokenNativeCurrencyLPAddress: '0x648a7452da25b4fb4bdb79badf374a8f8a5ea2b5' },
    { id: 'YFI', address: '0x29b0da86e484e1c0029b56e817912d778ac0ec69', tokenNativeCurrencyLPAddress: '0x4fc38a2735c7da1d71ccabf6dec235a7da4ec52c' },
    { id: 'LINK', address: '0xb3654dc3D10Ea7645f8319668E8F54d2574FBdC8', tokenNativeCurrencyLPAddress: '0x89d9bC2F2d091CfBFc31e333D6Dc555dDBc2fd29' },
    { id: 'SPIRIT', address: '0x5cc61a78f164885776aa610fb0fe1257df78e59b', tokenNativeCurrencyLPAddress: '0x30748322B6E34545DBe0788C421886AEB5297789' },
    { id: 'BIGwFTM', address: '0x8d3eB24C8782cB60273bcDDD2d36860815961C08', tokenNativeCurrencyLPAddress: '0x8d3eB24C8782cB60273bcDDD2d36860815961C08' },
  ],
  rpcUrls: ['https://rpc.ftm.tools/'],
  blockExplorerUrls: ['https://ftmscan.com'],
  bondAddresses: {
    BIG_ADDRESS: '0xBaf46c5Cc23Fa1Edd078C535E02B0EB440dA2703',
    BANG_ADDRESS: '0xef64A41AD01d374fa814B8FD2722572A4e2315D6',
    DYEL_ADDRESS: '0x5f17Bc490A1394a96f833196e5b6d44e312e03De',
    STAKING_ADDRESS: '0x5eB4BE087a4Af7edf7C1eCeae5eEeA27Dc962219',
    STAKING_HELPER_ADDRESS: '0x6f152647128A913A40a724E10B6608FbE9a19917',
    STAKING_WARMUP_ADDRESS: '0x220E709fBD7F47Ad4295661e97c7bF35E1789BCe',
    TREASURY_ADDRESS: '0x97718e3B42f080E0F0fA7774cE476823e5C784a2',
    DISTRIBUTOR_ADDRESS: '0xAFF941A45f1599f693482AE11Ca1Fc8558bCEB4c',
    BONDING_CALC_ADDRESS: '0xB98963d4269d5299AB1136Ce57532668fDEaDd19',
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
    REVERSE_BONDING_ADDRESS: '0x6c767255Ddd42654A79cDB59E248C4022E6E82fF',
  },
};

export default FTM_NETWORK;