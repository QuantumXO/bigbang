import { IBlockchain } from '@models/blockchain';
import { SUPPORTED_NETWORKS_CHAIN_IDS, ACTIVE_NETWORKS, DEFAULT_NETWORK } from '@constants/networks';
import
  React,
  { Context, createContext, FC, ReactElement, ReactNode, useCallback, useContext, useEffect, useMemo, useState }
from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '@store/slices/state.interface';
import { JsonRpcProvider, Network, StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import Web3Modal from 'web3modal';
import { loadTokenPrices } from '@services/helpers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { onSetChainID, onSetBonds, onSetTokens } from '@store/slices/network';
import { Dispatch } from 'redux';

type CommonContextDataType = {
  switchNetwork: (newChainId: string) => Promise<void>
  getIsEthereumAPIAvailable: () => boolean;
  getIsWrongNetwork: () => boolean;
  provider: JsonRpcProvider;
  address: string;
  isConnected: boolean;
  chainId: number;
  web3?: any;
  isActiveWrapModal: boolean;
  isCheckedWallet: boolean;
  isLoadingTokensPrices: boolean;
  toggleWrapModal: (isActive: boolean) => void;
  onDisconnect: () => void;
  hasCachedProvider: () => boolean;
  onConnect: () => Promise<Web3Provider | void>;
};
type CommonContextType = CommonContextDataType | null;

interface INetworkContextProviderProps {
  children: ReactNode;
}

const CommonContext: Context<CommonContextType> = createContext<CommonContextType>(null);

export const useCommonContext = (): CommonContextDataType => {
  const commonContext: CommonContextType = useContext(CommonContext);
  
  if (!commonContext) {
    throw new Error(
      'useWeb3Context() can only be used inside of <CommonContextProvider />, ' + 'please declare it at a higher level.'
    );
  }
  
  return useMemo((): CommonContextDataType => {
    return commonContext;
  }, [commonContext]);
};

export const useAddress = (): string => useCommonContext().address;

const { rpcUrls: DEFAULT_RPC_URLS = [] } = DEFAULT_NETWORK;

export const CommonContextProvider: FC<INetworkContextProviderProps> = ({ children }: INetworkContextProviderProps): ReactElement => {
  const { chainId } = useSelector((state: IReduxState) => state.network);
  const dispatch: Dispatch<any> = useDispatch();
  
  const [isConnected, setConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [provider, setProvider] = useState<JsonRpcProvider>(new StaticJsonRpcProvider(DEFAULT_RPC_URLS[0]));
  const [isLoadingTokensPrices, setIsLoadingTokensPrices] = useState<boolean>(true);
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [isCheckedWallet, setIsCheckedWallet] = useState<boolean>(false);
  const [isActiveWrapModal, toggleWrapModal] = useState<boolean>(false);
  
  const hasCachedProvider = (): boolean => !!web3Modal?.cachedProvider;
  
  useEffect((): void => {
    (async function() {
      dispatch(onSetBonds());
      dispatch(onSetTokens());
      
      await loadTokenPrices();
      
      setIsLoadingTokensPrices(false);
    })()
  }, []);
  
  useEffect((): void => {
    if (web3Modal) {
      (async function() {
        if (hasCachedProvider()) {
          await onConnect();
          setIsCheckedWallet(true);
        } else {
          setIsCheckedWallet(true);
        }
      })();
    }
  }, [web3Modal])
  
  useEffect((): void => {
    dispatch(onSetBonds());
    dispatch(onSetTokens());
    
    setWeb3Modal(
      new Web3Modal({
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              rpc: {
                // #TODO check
                [chainId]: getMainnetRpcURI(),
              }
            }
          }
        }
      })
    );
  }, [chainId]);
  
  const _initListeners = useCallback(
    (rawProvider: JsonRpcProvider) => {
      if (!rawProvider.on) {
        return;
      }
      
      rawProvider.on(
        'accountsChanged',
        () => setTimeout(() => window.location.reload(), 1)
      );
      
      rawProvider.on('chainChanged', async (chainId: number): Promise<void> => {
        await onHandleNetworkChange(chainId);
      });
      
      rawProvider.on('network', (_newNetwork, oldNetwork): void => {
        console.log('network: ', _newNetwork, oldNetwork);
        if (!oldNetwork) return;
        window.location.reload();
      });
    },
    [provider]
  );
  
  const onConnect = useCallback(async (): Promise<Web3Provider | void> => {
    if (web3Modal) {
      const rawProvider: JsonRpcProvider = await web3Modal?.connect();
      
      _initListeners(rawProvider);
      
      // @ts-ignore
      const connectedProvider: Web3Provider = new Web3Provider(rawProvider, 'any');
      const { chainId: connectedProviderChainId }: Network = await connectedProvider.getNetwork()
      const connectedAddress: string = await connectedProvider.getSigner().getAddress();
      
      setAddress(connectedAddress);
      
      dispatch(onSetChainID({ chainId: String(connectedProviderChainId) }));
      
      if (!getIsWrongNetwork()) {
        setProvider(connectedProvider);
      }
      
      setConnected(true);
      
      return connectedProvider;
    }
  }, [provider, web3Modal, isConnected]);
  
  const onHandleNetworkChange = async (hexChainId: number): Promise<void> => {
    // from hex to decimal
    const newChainId: string = String(parseInt(String(hexChainId), 16));
    dispatch(onSetChainID({ chainId: newChainId }));
  };
  
  const onDisconnect = useCallback((): void => {
    if (web3Modal) {
      web3Modal?.clearCachedProvider();
      setConnected(false);
      setTimeout((): void => window.location.reload(), 1);
    }
  }, [provider, web3Modal, isConnected]);
  
  const getCurrentNetwork = (): IBlockchain.INetwork | undefined => {
    return ACTIVE_NETWORKS
      .find(({ chainId: activeNetworkChainId }: IBlockchain.INetwork) => chainId === activeNetworkChainId);
  }
  
  const currentNetwork: IBlockchain.INetwork | undefined = getCurrentNetwork();
  
  const getNetworkVersion = (): string | undefined => window.ethereum?.networkVersion;
  
  const getIsEthereumAPIAvailable = (): boolean => !!window.ethereum;
  
  const getIsWrongNetwork = (): boolean => !SUPPORTED_NETWORKS_CHAIN_IDS.includes(String(getNetworkVersion()));
  
  const switchNetwork = async (newChainId: string): Promise<void> => {
    if (getIsEthereumAPIAvailable()) {
      try {
        await switchChainRequest(newChainId);
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            await addChainRequest(newChainId);
            await switchChainRequest(newChainId);
          } catch (addError) {
            console.error(error);
          }
        }
        console.error(error);
      }
    }
  }
  
  const switchChainRequest = async (newChainId: string): Promise<any> => {
    const newNetwork: IBlockchain.INetwork  | undefined = ACTIVE_NETWORKS
      .find(({ id }: IBlockchain.INetwork) => id === newChainId);
    
    if (newNetwork) {
      const { hexadecimalChainId } = newNetwork;
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: hexadecimalChainId }]
        });
        
        (process.env.NODE_ENV === 'development')
          ? window.location.replace('/')
          : window.location.replace('/');
      } catch (e) {
        console.log('switchChainRequest() e: ', e);
      }
    } else {
      throw new Error('switchChainRequest Error');
    }
  };
  
  const addChainRequest = (newChainId: string): any => {
    const newNetwork: IBlockchain.INetwork  | undefined = ACTIVE_NETWORKS
      .find(({ chainId: activeNetworkChainId }: IBlockchain.INetwork) => activeNetworkChainId === newChainId);
    
    if (newNetwork) {
      const { rpcUrls, blockExplorerUrls, nativeCurrency, chainName, hexadecimalChainId } = newNetwork;
      const { symbol, decimals, id } = nativeCurrency;
      const param: IBlockchain.IAddEthereumChainParameter = {
        chainId: hexadecimalChainId, // hex
        chainName,
        rpcUrls,
        blockExplorerUrls,
        nativeCurrency: {
          name: id,
          decimals,
          symbol,
        }
      }
      try {
        return window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [param]
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      //
    }
  };
  
  const getMainnetRpcURI = (): string | undefined => {
    if (currentNetwork) {
      const {rpcUrls = []} = currentNetwork;
      return rpcUrls[0];
    }
  }
  
  const contextValue: CommonContextDataType = useMemo(
    (): CommonContextDataType => ({
      switchNetwork,
      getIsWrongNetwork,
      getIsEthereumAPIAvailable,
      provider,
      isConnected,
      address,
      chainId: Number(chainId),
      hasCachedProvider,
      onConnect,
      onDisconnect,
      isLoadingTokensPrices,
      isCheckedWallet,
      isActiveWrapModal,
      toggleWrapModal,
    }),
    [
      getIsWrongNetwork, switchNetwork, getIsEthereumAPIAvailable, onConnect, onDisconnect, hasCachedProvider,
      provider, isConnected, address, chainId, isLoadingTokensPrices, toggleWrapModal, isActiveWrapModal
    ]
  );
  
  return <CommonContext.Provider value={contextValue}>{children}</CommonContext.Provider>;
}