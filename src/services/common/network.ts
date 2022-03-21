import { IBlockchain } from '@models/blockchain';
import { messages } from '@constants/messages';
import { NETWORKS, SUPPORTED_NETWORKS_CHAIN_IDS } from '@constants/blockchain';

interface INetworkArgs {
  newNetworkId?: IBlockchain.NetworkType
}

export class Network {
  currentChainId: string | undefined;
  newNetworkId: IBlockchain.NetworkType | undefined;
  
  constructor(props: INetworkArgs = {}) {
    const { newNetworkId } = props;
    
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
    const newNetwork: IBlockchain.INetwork  | undefined = NETWORKS
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
    const newNetwork: IBlockchain.INetwork  | undefined = NETWORKS
      .find(({ id }: IBlockchain.INetwork) => id === this.newNetworkId);
    
    if (newNetwork) {
      const { rpcUrls, blockExplorerUrls, nativeCurrency, chainName, hexadecimalChainId } = newNetwork;
      const param: IBlockchain.IAddEthereumChainParameter = {
        chainId: hexadecimalChainId,
        chainName,
        rpcUrls,
        blockExplorerUrls,
        nativeCurrency
      }
  
      return window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [param]
      });
    } else {
      //
    }
  };
}

const network = (args?: INetworkArgs) => new Network(args);

export default network;