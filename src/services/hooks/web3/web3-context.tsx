import React, { Context, ReactElement, useCallback, useContext, useMemo, useState } from 'react';
import Web3Modal from "web3modal";
import { JsonRpcProvider, StaticJsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { getMainnetURI } from "./helpers";
import { DEFAULT_NETWORK } from "@constants/index";
import { IBlockchain } from "@models/blockchain";
import network from "@services/common/network";

type OnChainProviderType = {
  connect: () => Promise<Web3Provider>;
  disconnect: () => void;
  checkIsWrongNetwork: () => Promise<boolean>;
  provider: JsonRpcProvider;
  address: string;
  connected: boolean;
  web3Modal: Web3Modal;
  chainID: number;
  web3?: any;
  providerChainID: number;
  hasCachedProvider: () => boolean;
};

export type Web3ContextDataType = {
  OnChainProviderType: OnChainProviderType;
} | null;

const Web3Context: Context<Web3ContextDataType> = React.createContext<Web3ContextDataType>(null);

export const useWeb3Context = () => {
  const web3Context = useContext(Web3Context);
  if (!web3Context) {
    throw new Error("useWeb3Context() can only be used inside of <Web3ContextProvider />, " + "please declare it at a higher level.");
  }
  const { OnChainProviderType } = web3Context;
  return useMemo(() => {
    return { ...OnChainProviderType };
  }, [web3Context]);
};

export const useAddress = () => {
  const { address } = useWeb3Context();
  return address;
};

export const Web3ContextProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [chainID, setChainID] = useState<string | undefined>(network().getCurrentChainId);
  const [providerChainID, setProviderChainID] = useState<string>(DEFAULT_NETWORK.chainId);
  const [address, setAddress] = useState<string>("");
  
  const [uri, setUri] = useState<string>(getMainnetURI());
  const [provider, setProvider] = useState<JsonRpcProvider>(new StaticJsonRpcProvider(uri));
  
  const [web3Modal] = useState<Web3Modal>(
    new Web3Modal({
      cacheProvider: true,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              [IBlockchain.NetworksEnum.AVAX]: getMainnetURI()
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
  
  const onHandleNetworkChange = async (chainId: number): Promise<void> => {
    setProviderChainID(String(chainId));
  };
  
  const connect = useCallback(async (): Promise<Web3Provider> => {
    const rawProvider = await web3Modal.connect();
    
    _initListeners(rawProvider);
    
    const connectedProvider: Web3Provider = new Web3Provider(rawProvider, "any");
    const chainId: number = await connectedProvider.getNetwork().then(network => Number(network.chainId));
    const connectedAddress: string = await connectedProvider.getSigner().getAddress();
    
    setAddress(connectedAddress);
    
    setProviderChainID(String(chainId));
    
    if (chainId === IBlockchain.NetworksEnum.AVAX) {
      setProvider(connectedProvider);
    }
    
    setConnected(true);
    
    return connectedProvider;
  }, [provider, web3Modal, connected]);
  
  const checkIsWrongNetwork = async () => await network().getIsWrongNetwork;
  
  const disconnect = useCallback(() => {
    web3Modal.clearCachedProvider();
    setConnected(false);
    
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }, [provider, web3Modal, connected]);
  
  const OnChainProviderType = useMemo(
    () => ({
      connect,
      disconnect,
      hasCachedProvider,
      provider,
      connected,
      address,
      chainID,
      web3Modal,
      providerChainID,
      checkIsWrongNetwork
    }),
    [connect, disconnect, hasCachedProvider, provider, connected, address, chainID, web3Modal, providerChainID]
  );
  //@ts-ignore
  return <Web3Context.Provider value={{ OnChainProviderType }}>{children}</Web3Context.Provider>;
};
