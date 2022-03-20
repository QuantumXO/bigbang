import { IBlockchain } from '@models//blockchain';
import { messages } from '@constants/messages';

interface INetworkArgs {
  newNetworkName?: IBlockchain.NetworkType
}

export class Network {
  newNetworkName: IBlockchain.NetworkType | undefined;
  
  constructor(props: INetworkArgs = {}) {
    const { newNetworkName } = props;
    
    this.newNetworkName = newNetworkName;
  }
  
  get getCurrentChainId(): number | undefined {
    return window.ethereum?.networkVersion;
  }
  
  get getIsWrongNetwork(): boolean {
    const result: boolean = false;
  
    /*if (this.getCurrentChainId !== DEFAULT_NETWORK) {
      const shouldSwitch = window.confirm(messages.switch_to_avalanche);
      if (shouldSwitch) {
        await network();
        window.location.reload();
      }
      result = true;
    }*/
  
    return result;
  }
  
  switchNetwork = async (): Promise<void> => {
    if (window.ethereum) {
      try {
        await this.switchRequest();
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            await this.addChainRequest();
            await this.switchRequest();
          } catch (addError) {
            console.log(error);
          }
        }
        console.log(error);
      }
    }
  }
  
  switchRequest = (): any => {
    return window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xa86a" }]
    });
  };
  
  addChainRequest = (): any => {
    return window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0xa86a",
          chainName: "Avalanche Mainnet",
          rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
          blockExplorerUrls: ["https://cchain.explorer.avax.network/"],
          nativeCurrency: {
            name: "AVAX",
            symbol: "AVAX",
            decimals: 18
          }
        }
      ]
    });
  };
}

const network = (args?: INetworkArgs) => new Network(args);

export default network;

/*const switchRequest = () => {
 return window.ethereum.request({
 method: "wallet_switchEthereumChain",
 params: [{ chainId: "0xa86a" }]
 });
 };*/

/*const addChainRequest = () => {
 return window.ethereum.request({
 method: "wallet_addEthereumChain",
 params: [
 {
 chainId: "0xa86a",
 chainName: "Avalanche Mainnet",
 rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
 blockExplorerUrls: ["https://cchain.explorer.avax.network/"],
 nativeCurrency: {
 name: "AVAX",
 symbol: "AVAX",
 decimals: 18
 }
 }
 ]
 });
 };*/

/*export const switchNetwork = async (networkName?: NetworkType): Promise<void> => {
 if (window.ethereum) {
 try {
 await switchRequest();
 } catch (error: any) {
 if (error.code === 4902) {
 try {
 await addChainRequest();
 await switchRequest();
 } catch (addError) {
 console.log(error);
 }
 }
 console.log(error);
 }
 }
 };*/