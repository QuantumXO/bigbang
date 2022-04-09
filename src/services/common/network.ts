import { IBlockchain } from '@models/blockchain';
import { messages } from '@constants/messages';
import { SUPPORTED_NETWORKS_CHAIN_IDS, ACTIVE_NETWORKS } from '@constants/networks';
import tokensAssets, { ITokenAsset } from '@constants/tokens';

interface INetworkArgs {
  newNetworkId?: IBlockchain.NetworkType
}

export class Network {
  currentChainId: string | undefined;
  newNetworkId: IBlockchain.NetworkType | undefined;
  
  constructor(props: INetworkArgs = {}) {
    const { newNetworkId } = props;
    
    this.setCurrentChainId();
    this.newNetworkId = newNetworkId;
  }
  
  setCurrentChainId(): void {
    this.currentChainId = this.getCurrentChainId;
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
          const shouldSwitch: boolean = window.confirm(messages.switch_to_eth);
          if (shouldSwitch) {
            await network({ newNetworkId: 'ETH' }).switchNetwork();
            window.location.reload();
          }
          result = true;
        }
        
        return result;
      }
    )();
  }
  
  switchNetwork = async (): Promise<void> => {
    if (this.getIsEthereumAPIAvailable) {
      try {
        await this.switchChainRequest();
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            await this.addChainRequest();
            await this.switchChainRequest();
          } catch (addError) {
            console.error(error);
          }
        }
        console.error(error);
      }
    }
  }
  
  switchChainRequest = (): any => {
    const newNetwork: IBlockchain.INetwork  | undefined = ACTIVE_NETWORKS
      .find(({ id }: IBlockchain.INetwork) => id === this.newNetworkId);
    
    if (newNetwork) {
      const { hexadecimalChainId } = newNetwork;
      
      return window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hexadecimalChainId }]
      });
    } else {
      //
    }
  };
  
  addChainRequest = (): any => {
    const newNetwork: IBlockchain.INetwork  | undefined = ACTIVE_NETWORKS
      .find(({ id }: IBlockchain.INetwork) => id === this.newNetworkId);
    
    if (newNetwork) {
      const { rpcUrls, blockExplorerUrls, nativeCurrency, chainName, hexadecimalChainId } = newNetwork;
      const param: IBlockchain.IAddEthereumChainParameter = {
        chainId: hexadecimalChainId,
        chainName,
        rpcUrls,
        blockExplorerUrls,
        // nativeCurrency
      }
  
      return window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [param]
      });
    } else {
      //
    }
  };
  
  get getCurrentNetwork(): IBlockchain.INetwork | undefined {
    return ACTIVE_NETWORKS.find(({ chainId }: IBlockchain.INetwork) => chainId === this.currentChainId);
  }
  
  /* get getStableTokenForCurrentNetwork(): IBlockchain.StableTokenType | undefined {
    const currentNetwork: IBlockchain.INetwork | undefined = this.getCurrentNetwork;
    
    if (currentNetwork) {
      return currentNetwork.stableTokenType;
    }
  } */
  
  get getMainnetRpcURI(): string | undefined {
    const currentNetwork: IBlockchain.INetwork | undefined = this.getCurrentNetwork;
  
    if (currentNetwork) {
      const {rpcUrls = []} = currentNetwork;
      return rpcUrls[0];
    }
  }
  
  get getCurrentNetworkTokens(): IBlockchain.IToken[] | undefined {
    const currentNetwork: IBlockchain.INetwork | undefined = this.getCurrentNetwork;
    let result: IBlockchain.IToken[] | undefined;
    
    if (currentNetwork) {
      const { tokens, nativeCurrency } = currentNetwork;
      result = tokens
        .map(({ id, address }: IBlockchain.INetworkToken): IBlockchain.IToken | undefined => {
          const tokenAsset: ITokenAsset | undefined = tokensAssets
            .find(({ id: tokenAssetId }: ITokenAsset) => tokenAssetId === id);
          if (tokenAsset) {
            return {
              ...tokenAsset,
              id,
              address,
            };
          }
        })
        .filter((item: IBlockchain.INetworkToken | undefined) => !!item) as IBlockchain.IToken[];
      
      const nativeCurrencyAsset: ITokenAsset | undefined = tokensAssets
        .find(({ id: tokenAssetId }: ITokenAsset) => tokenAssetId === nativeCurrency.id);
      
      if (nativeCurrencyAsset) {
        const { id, address } = nativeCurrency;
        const nativeCurrencyToken: IBlockchain.IToken = {
          ...nativeCurrencyAsset,
          id,
          address,
          isNativeCurrency: true,
        };
        result.push(nativeCurrencyToken);
      }
    }
    
    return result;
  }
}

const network = (args?: INetworkArgs) => new Network(args);

export default network;