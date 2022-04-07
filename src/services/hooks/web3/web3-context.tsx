import React, { Context, ReactElement, useCallback, useContext, useMemo, useState, createContext, FC, ReactNode } from 'react';
import Web3Modal from "web3modal";
import { JsonRpcProvider, Network, StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { DEFAULT_NETWORK } from "@constants/index";
import { IBlockchain } from "@models/blockchain";
import network from "@services/common/network";

type Web3ContextDataType = {
  connect: () => Promise<Web3Provider>;
  disconnect: () => void;
  getIsWrongNetwork: () => Promise<boolean>;
  provider: JsonRpcProvider;
  address: string;
  isConnected: boolean;
  web3Modal: Web3Modal;
  chainID: number;
  web3?: any;
  providerChainID: number;
  hasCachedProvider: () => boolean;
};
type Web3ContextType = Web3ContextDataType | null;

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

export const Web3ContextProvider: FC<{ children: ReactNode }> = ({ children }): ReactElement => {
  const { chainId: DEFAULT_CHAIN_ID, rpcUrls: DEFAULT_RPC_URLS = [] } = DEFAULT_NETWORK;
  
  const [isConnected, setConnected] = useState<boolean>(false);
  const [chainID, setChainID] = useState<string | undefined>(network().getCurrentChainId);
  const [providerChainID, setProviderChainID] = useState<string>(DEFAULT_CHAIN_ID);
  const [address, setAddress] = useState<string>('');
  const [provider, setProvider] = useState<JsonRpcProvider>(
    new StaticJsonRpcProvider(network().getMainnetRpcURI || DEFAULT_RPC_URLS[0])
  );
  const [web3Modal] = useState<Web3Modal>(
    new Web3Modal({
      cacheProvider: true,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              // #TODO check
              [IBlockchain.NetworksEnum.FTM]: network().getMainnetRpcURI,
            }
          }
        }
      }
    })
  );
  
  const hasCachedProvider = (): boolean => {
    if (!web3Modal) return false;
    else if (!web3Modal.cachedProvider) return false;
    return true;
  };

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
      });
      
      rawProvider.on("network", (_newNetwork, oldNetwork) => {
        if (!oldNetwork) return;
        window.location.reload();
      });
    },
    [provider]
  );
  
  const onHandleNetworkChange = async (hexadecimalChainId: number): Promise<void> => {
    // from hex to decimal
    // setProviderChainID(String(parseInt(String(hexadecimalChainId), 16)));
    setChainID(String(parseInt(String(hexadecimalChainId), 16)));
  };
  
  const onConnect = useCallback(async (): Promise<Web3Provider> => {
    const rawProvider: any = await web3Modal.connect();
    
    _initListeners(rawProvider);
    
    const connectedProvider: Web3Provider = new Web3Provider(rawProvider, "any");
    const chainId: number = await connectedProvider.getNetwork().then(({ chainId }: Network) => chainId);
    const connectedAddress: string = await connectedProvider.getSigner().getAddress();
    
    setAddress(connectedAddress);
    
    setProviderChainID(String(chainId));
  
    if (!await network().getIsWrongNetwork) {
      setProvider(connectedProvider);
    }
    
    setConnected(true);
    
    return connectedProvider;
  }, [provider, web3Modal, isConnected]);
  
  const getIsWrongNetwork = async () => await network().getIsWrongNetwork;
  
  const onDisconnect = useCallback((): void => {
    web3Modal.clearCachedProvider();
    setConnected(false);
    
    setTimeout((): void => window.location.reload(), 1);
  }, [provider, web3Modal, isConnected]);

  const contextValue = useMemo(
    (): Web3ContextDataType => ({
      provider,
      isConnected,
      address,
      chainID: Number(chainID),
      web3Modal,
      providerChainID: Number(providerChainID),
      hasCachedProvider,
      getIsWrongNetwork,
      connect: onConnect,
      disconnect: onDisconnect,
    }),
    [
      onConnect, onDisconnect, hasCachedProvider, provider, isConnected, address, chainID, web3Modal,
      providerChainID
    ]
  );
  
  return <Web3Context.Provider value={contextValue}>{children}</Web3Context.Provider>;
};
