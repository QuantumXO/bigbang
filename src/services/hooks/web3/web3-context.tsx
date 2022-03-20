import React, { ReactElement, useCallback, useContext, useMemo, useState } from "react";
import Web3Modal from "web3modal";
import { JsonRpcProvider, StaticJsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { getMainnetURI } from "./helpers";
import { DEFAULT_NETWORK } from "@constants/index";
import { IBlockchain } from "@models/blockchain";
import { messages } from "@constants/messages";
import { useDispatch } from "react-redux";
import network from "../../common/network";

type onChainProvider = {
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

export type Web3ContextData = {
  onChainProvider: onChainProvider;
} | null;

const Web3Context = React.createContext<Web3ContextData>(null);

export const useWeb3Context = () => {
  const web3Context = useContext(Web3Context);
  if (!web3Context) {
    throw new Error("useWeb3Context() can only be used inside of <Web3ContextProvider />, " + "please declare it at a higher level.");
  }
  const { onChainProvider } = web3Context;
  return useMemo(() => {
    return { ...onChainProvider };
  }, [web3Context]);
};

export const useAddress = () => {
  const { address } = useWeb3Context();
  return address;
};

export const Web3ContextProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const dispatch = useDispatch();
  
  const [connected, setConnected] = useState(false);
  const [chainID, setChainID] = useState(DEFAULT_NETWORK);
  const [providerChainID, setProviderChainID] = useState(DEFAULT_NETWORK);
  const [address, setAddress] = useState("");
  
  const [uri, setUri] = useState(getMainnetURI());
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
      
      rawProvider.on("chainChanged", async (chain: number): Promise<void> => {
        await changeNetwork(chain);
      });
      
      rawProvider.on("network", (_newNetwork, oldNetwork) => {
        if (!oldNetwork) return;
        window.location.reload();
      });
    },
    [provider]
  );
  
  const changeNetwork = async (otherChainID: number): Promise<void> => {
    const network: number = Number(otherChainID);
    
    setProviderChainID(network);
  };
  
  const connect = useCallback(async (): Promise<Web3Provider> => {
    const rawProvider = await web3Modal.connect();
    
    _initListeners(rawProvider);
    
    const connectedProvider: Web3Provider = new Web3Provider(rawProvider, "any");
    const chainId: number = await connectedProvider.getNetwork().then(network => Number(network.chainId));
    const connectedAddress: string = await connectedProvider.getSigner().getAddress();
    
    setAddress(connectedAddress);
    
    setProviderChainID(chainId);
    
    if (chainId === IBlockchain.NetworksEnum.AVAX) {
      setProvider(connectedProvider);
    }
    
    setConnected(true);
    
    return connectedProvider;
  }, [provider, web3Modal, connected]);
  
  const checkIsWrongNetwork = async (): Promise<boolean> => {
    if (providerChainID !== DEFAULT_NETWORK) {
      const shouldSwitch = window.confirm(messages.switch_to_avalanche);
      if (shouldSwitch) {
        await network();
        window.location.reload();
      }
      return true;
    }
    
    return false;
  };
  
  const disconnect = useCallback(() => {
    web3Modal.clearCachedProvider();
    setConnected(false);
    
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }, [provider, web3Modal, connected]);
  
  const onChainProvider = useMemo(
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
  return <Web3Context.Provider value={{ onChainProvider }}>{children}</Web3Context.Provider>;
};
