import
  React,
{ Context, ReactElement, useCallback, useContext, useMemo, useState, createContext, FC, ReactNode, useEffect }
  from 'react';
import Web3Modal from "web3modal";
import { JsonRpcProvider, Network, StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { DEFAULT_NETWORK } from "@constants/networks";
import network from "@services/common/network";
import { loadTokenPrices } from '@services/helpers';
import { useSelector } from 'react-redux';
import { IReduxState } from '@store/slices/state.interface';

type Web3ContextDataType = {
  provider: JsonRpcProvider;
  address: string;
  isConnected: boolean;
  chainID: number;
  web3?: any;
  isCheckedWallet: boolean;
  isLoadingTokensPrices: boolean;
  disconnect: () => void;
  hasCachedProvider: () => boolean;
  connect: () => Promise<Web3Provider | void>;
};
type Web3ContextType = Web3ContextDataType | null;

interface IWeb3ContextProviderProps {
  children: ReactNode
}

const Web3Context: Context<Web3ContextType> = createContext<Web3ContextType>(null);

export const useWeb3Context = (): Web3ContextDataType => {
  const web3Context: Web3ContextType = useContext(Web3Context);
  
  if (!web3Context) {
    throw new Error(
      "useWeb3Context() can only be used inside of <Web3ContextProvider />, " + "please declare it at a higher level."
    );
  }
  
  return useMemo((): Web3ContextDataType => {
    return web3Context;
  }, [web3Context]);
};

export const useAddress = (): string => {
  const { address } = useWeb3Context();
  return address;
};

const { chainId: DEFAULT_CHAIN_ID, rpcUrls: DEFAULT_RPC_URLS = [] } = DEFAULT_NETWORK;

export const Web3ContextProvider: FC<IWeb3ContextProviderProps> = ({ children }: IWeb3ContextProviderProps): ReactElement => {
  const [isConnected, setConnected] = useState<boolean>(false);
  const [chainID, setChainID] = useState<string>(network.getCurrentChainId || DEFAULT_CHAIN_ID);
  const [address, setAddress] = useState<string>('');
  const [provider, setProvider] = useState<JsonRpcProvider>(
    new StaticJsonRpcProvider(network.getMainnetRpcURI || DEFAULT_RPC_URLS[0])
  );
  const [isLoadingTokensPrices, setIsLoadingTokensPrices] = useState<boolean>(true);
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [isCheckedWallet, setIsCheckedWallet] = useState<boolean>(false);
  
  const hasCachedProvider = (): boolean => !!web3Modal?.cachedProvider;
  
  useEffect((): void => {
    (async function() {
      if (hasCachedProvider()) {
        await onConnect();
        setIsCheckedWallet(true);
      } else {
        setIsCheckedWallet(true);
      }
      
      await loadTokenPrices();
  
      setIsLoadingTokensPrices(false);
    })()
  }, []);
  
  useEffect((): void => {
    setWeb3Modal(
      new Web3Modal({
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
           package: WalletConnectProvider,
           options: {
             rpc: {
               // #TODO check
               [chainID]: network.getMainnetRpcURI,
             }
           }
         }
        }
      })
    );
  }, [chainID]);

  const _initListeners = useCallback(
    (rawProvider: JsonRpcProvider) => {
      if (!rawProvider.on) {
        return;
      }
      
      rawProvider.on(
        "accountsChanged",
        () => setTimeout(() => window.location.reload(), 1)
      );
      
      rawProvider.on("chainChanged", async (chainId: number): Promise<void> => {
        await onHandleNetworkChange(chainId);
  
        console.log('chainChanged(): ', chainId);
      });
      
      rawProvider.on("network", (_newNetwork, oldNetwork): void => {
        console.log('network: ', _newNetwork, oldNetwork);
        if (!oldNetwork) return;
        window.location.reload();
      });
    },
    [provider]
  );
  
  const onHandleNetworkChange = async (hexChainId: number): Promise<void> => {
    // from hex to decimal
    setChainID(String(parseInt(String(hexChainId), 16)));
  
    network.setCurrentChainId(network.getCurrentChainId);
  
    console.log('network.getCurrentChainId: ', network.getCurrentChainId);
  };
  
  const onConnect = useCallback(async (): Promise<Web3Provider | void> => {
    console.log('onConnect()');
    
    if (web3Modal) {
      const rawProvider: any = await web3Modal?.connect();
  
      _initListeners(rawProvider);
  
      const connectedProvider: Web3Provider = new Web3Provider(rawProvider, "any");
      const { chainId }: Network = await connectedProvider.getNetwork()
      const connectedAddress: string = await connectedProvider.getSigner().getAddress();
  
      setAddress(connectedAddress);
  
      setChainID(String(chainId));
  
      if (!await network.getIsWrongNetwork) {
        setProvider(connectedProvider);
      }
  
      setConnected(true);
  
      return connectedProvider;
    }
  }, [provider, web3Modal, isConnected]);
  
  const onDisconnect = useCallback((): void => {
    if (web3Modal) {
      web3Modal?.clearCachedProvider();
      setConnected(false);
      setTimeout((): void => window.location.reload(), 1);
    }
  }, [provider, web3Modal, isConnected]);

  const contextValue = useMemo(
    (): Web3ContextDataType => ({
      provider,
      isConnected,
      address,
      chainID: Number(chainID),
      hasCachedProvider,
      connect: onConnect,
      disconnect: onDisconnect,
      isLoadingTokensPrices,
      isCheckedWallet
    }),
    [
      onConnect, onDisconnect, hasCachedProvider, provider, isConnected, address, chainID, isLoadingTokensPrices
    ]
  );
  
  return <Web3Context.Provider value={contextValue}>{children}</Web3Context.Provider>;
};
