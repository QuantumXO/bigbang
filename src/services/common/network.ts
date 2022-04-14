import { IBlockchain } from '@models/blockchain';
import { SUPPORTED_NETWORKS_CHAIN_IDS, ACTIVE_NETWORKS } from '@constants/networks';
import tokensAssets from '@constants/tokens';
import { Bond } from '@services/common/bond';
import allBonds from "@constants/bonds";

interface ICache {
  bonds: Bond[];
  tokens: IBlockchain.IToken[];
}

let fromCache: number = 0;
let fromFunc: number = 0;

const initialCache: ICache = {
  bonds: [],
  tokens: [],
};

const cache: ICache = initialCache;

const setCache = (field: keyof ICache, value: any): void => cache[field] = value;

const getCache = (field: keyof ICache): any => cache[field];

const clearCache = (): void => {
  cache.bonds = [];
  cache.tokens = [];
}

export class Network {
  currentChainId: string | undefined;
  
  constructor() {
    this.setCurrentChainId(this.getCurrentChainId)
    this.setCacheBonds(this.getCurrentNetworkBonds)
    this.setCacheTokens(this.getCurrentNetworkTokens)
  }
  
  setCacheBonds = (bonds: Bond[] = []): void => setCache('bonds', bonds);
  
  setCacheTokens = (tokens: IBlockchain.IToken[] = []): void => setCache('tokens', tokens);
  
  setCurrentChainId = (chainId: string | undefined): string | undefined => {
    return this.currentChainId = chainId;
  }
  
  get getCurrentChainId(): string | undefined {
    return window.ethereum?.networkVersion;
  }
  
  get getIsEthereumAPIAvailable(): boolean {
    return !!window.ethereum;
  }
  
  get getIsWrongNetwork(): Promise<boolean> {
    let result: boolean = false;
    
    return (
      async (): Promise<boolean> => {
        if (!SUPPORTED_NETWORKS_CHAIN_IDS.includes(String(this.getCurrentChainId))) {
          // const shouldSwitch: boolean = window.confirm(messages.switch_to_ftm);
          /* if (shouldSwitch) {
            await network({ newNetworkId: 'FTM' }).switchNetwork();
          } */
          result = true;
        }
        
        return result;
      }
    )();
  }
  
  switchNetwork = async (newNetworkId: IBlockchain.NetworkType): Promise<void> => {
    if (this.getIsEthereumAPIAvailable) {
      try {
        await this.switchChainRequest(newNetworkId);
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            await this.addChainRequest(newNetworkId);
            await this.switchChainRequest(newNetworkId);
          } catch (addError) {
            console.error(error);
          }
        }
        console.error(error);
      }
    }
  }
  
  switchChainRequest = async (newNetworkId: IBlockchain.NetworkType): Promise<any> => {
    const newNetwork: IBlockchain.INetwork  | undefined = ACTIVE_NETWORKS
      .find(({ id }: IBlockchain.INetwork) => id === newNetworkId);
    
    if (newNetwork) {
      const { hexadecimalChainId, chainId } = newNetwork;
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: hexadecimalChainId }]
        });
        
        clearCache();
        
        (process.env.NODE_ENV === 'development')
          ? window.location.replace('/')
          : window.location.replace('https://quantumxo.github.io/bigbang');
      } catch (e) {
        console.log(e);
      }
    } else {
      throw new Error('switchChainRequest Error');
    }
  };
  
  addChainRequest = (newNetworkId: IBlockchain.NetworkType): any => {
    const newNetwork: IBlockchain.INetwork  | undefined = ACTIVE_NETWORKS
      .find(({ id }: IBlockchain.INetwork) => id === newNetworkId);
    
    if (newNetwork) {
      const { rpcUrls, blockExplorerUrls, nativeCurrency, chainName, hexadecimalChainId } = newNetwork;
      const param: IBlockchain.IAddEthereumChainParameter = {
        chainId: hexadecimalChainId,
        chainName,
        rpcUrls,
        blockExplorerUrls,
        // nativeCurrency
      }
      try {
        return window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [param]
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      //
    }
  };
  
  get getCurrentNetwork(): IBlockchain.INetwork | undefined {
    return ACTIVE_NETWORKS.find(({ chainId }: IBlockchain.INetwork) => chainId === this.currentChainId);
  }
  
  get getMainnetRpcURI(): string | undefined {
    const currentNetwork: IBlockchain.INetwork | undefined = this.getCurrentNetwork;
  
    if (currentNetwork) {
      const {rpcUrls = []} = currentNetwork;
      return rpcUrls[0];
    }
  }
  
  get getCurrentNetworkTokens(): IBlockchain.IToken[] | undefined {
    const bonds: Bond[] = getCache('bonds') || [];
    const tokens: IBlockchain.IToken[] = getCache('tokens') || [];
    let result: IBlockchain.IToken[] = tokens;
    
    if (!tokens.length) {
      fromFunc = ++fromFunc;
      const currentNetwork: IBlockchain.INetwork | undefined = this.getCurrentNetwork;
  
      if (currentNetwork) {
        const { tokens, nativeCurrency } = currentNetwork;
        result = tokens
          .map(({ id, address, tokenNativeCurrencyLPAddress }: IBlockchain.INetworkToken): IBlockchain.IToken | undefined => {
            const tokenAsset: IBlockchain.ITokenAsset | undefined = tokensAssets
              .find(({ id: tokenAssetId }: IBlockchain.ITokenAsset) => tokenAssetId === id);
            const bondIcon: string | undefined = bonds.find(({ id: bondId }: Bond) => bondId === id)?.bondIcon;
            if (tokenAsset) {
              return {
                ...tokenAsset,
                icon: bondIcon,
                id,
                address,
                tokenNativeCurrencyLPAddress,
              };
            }
          })
          .filter((item: IBlockchain.INetworkToken | undefined) => !!item) as IBlockchain.IToken[];
    
        const nativeCurrencyAsset: IBlockchain.ITokenAsset | undefined = tokensAssets
          .find(({ id: tokenAssetId }: IBlockchain.ITokenAsset) => tokenAssetId === nativeCurrency.id);
        const nativeCurrencyBondIcon: string | undefined = bonds
          .find(({ id: bondId }: Bond) => bondId === nativeCurrency.id)?.bondIcon;
    
        if (nativeCurrencyAsset) {
          const { id, address } = nativeCurrency;
          const nativeCurrencyToken: IBlockchain.IToken = {
            ...nativeCurrencyAsset,
            icon: nativeCurrencyBondIcon,
            id,
            address,
            isNativeCurrency: true,
          };
          result.push(nativeCurrencyToken);
        }
      }
    } else {
      fromCache = ++fromCache;
    }
  
    // console.log('fromCache, fromFunc: ', fromCache, fromFunc);
    
    return result;
  }
  
  get getNetworkBigNativeCurrencyLPToken(): IBlockchain.IToken | undefined  {
    const tokens: IBlockchain.IToken[] | undefined = this.getCurrentNetworkTokens;
    return tokens?.find(({ isBigNativeCurrencyLP }: IBlockchain.IToken) => isBigNativeCurrencyLP);
  }
  
  get getNetworkUSDCNativeCurrencyLPToken(): IBlockchain.IToken | undefined  {
    const tokens: IBlockchain.IToken[] | undefined = this.getCurrentNetworkTokens;
    return tokens?.find(({ isUSDCNativeCurrencyLP }: IBlockchain.IToken) => isUSDCNativeCurrencyLP);
  }
  
  get getCurrentNetworkBonds(): Bond[] {
    const bonds: Bond[] = getCache('bonds') || [];
    let result: Bond[] = bonds;
    
    if (!bonds.length) {
      const currentNetwork: IBlockchain.INetwork | undefined = this.getCurrentNetwork;
      if (currentNetwork) {
        result = allBonds.filter((bond: Bond) => {
          const { networkType } = bond;
          return this.getIsValidBond(bond) && currentNetwork.id === networkType
        });
      }
    }
   
    return result;
  }
  
  getIsValidBond(bond: Bond): boolean {
    const { id: bondId, bondAddress } = bond;
    const bondToken: IBlockchain.IToken | undefined = this.getCurrentNetworkTokens
      ?.find(({ id: tokenId }: IBlockchain.IToken) => tokenId === bondId);
    let result: boolean = true;
    
    if (
      !bondAddress
      || !bondToken
      || !bondToken.address
      || !bondToken.tokenNativeCurrencyLPAddress
    ) {
      result = false;
    }
    
    return result;
  }
}

const network: Network = new Network();

export default network;