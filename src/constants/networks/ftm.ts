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
    { id: 'USDC', address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', tokenNativeCurrencyLPAddress: '0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c' },
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
    { id: 'BIGwFTM', address: '0x659BB25B9308bfA16F5ea8d452b9a2BbaE84F60F', tokenNativeCurrencyLPAddress: '0x659BB25B9308bfA16F5ea8d452b9a2BbaE84F60F' },
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
    BONDING_CALC_ADDRESS: '0xD4Ff1551bb7F9Eb2d7dd931bE2cbA581e5F43FaD',
    ZAPIN_ADDRESS: '0x0000000000000000000000000000000000000000',
  },
};

export default FTM_NETWORK;