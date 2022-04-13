import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IReduxState } from "@store/slices/state.interface";
import { IBlockchain } from '@models/blockchain';
import network from '@services/common/network';
import { IAccount } from '@models/account';

// Smash all the interfaces together to get the BondData Type
export interface IAllTokenData extends IBlockchain.IToken, IAccount.IUserTokenDetails { }
export interface IUseTokensReturn {
  tokens: IAllTokenData[];
  loading: boolean;
}

const initialTokenArray: IBlockchain.IToken[] = network.getCurrentNetworkTokens || [];

function useTokens(): IUseTokensReturn {
  const accountLoading: boolean = useSelector<IReduxState, boolean>(state => state.account.loading);
  const accountTokensState =
    useSelector<IReduxState, Record<string,  IAccount.IUserTokenDetails>>(state => state.account.tokens);
  
  //@ts-ignore
  const [tokens, setTokens] = useState<IAllTokenData[]>(initialTokenArray);
  
  useEffect((): void => {
    //@ts-ignore
    const tokenDetails: IAllTokenData[] = (network.getCurrentNetworkTokens || [])
      .flatMap((token: IBlockchain.IToken) => {
        if (accountTokensState[token.id]) {
          return Object.assign(token, accountTokensState[token.id]);
        }
        return token;
      });
    
    const mostProfitableBonds: IAllTokenData[] = tokenDetails
      .concat()
      .sort((a: IAllTokenData, b: IAllTokenData) => {
        return a["balance"] > b["balance"] ? -1 : b["balance"] > a["balance"] ? 1 : 0;
      });
    
    setTokens(mostProfitableBonds);
  }, [accountTokensState, accountLoading]);
  
  return { tokens, loading: accountLoading };
}

export default useTokens;
