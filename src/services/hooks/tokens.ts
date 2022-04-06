import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import allTokens, { IToken } from "../helpers/tokens";
import { IUserTokenDetails } from "@store/slices/account-slice";
import { IReduxState } from "@store/slices/state.interface";

// Smash all the interfaces together to get the BondData Type
export interface IAllTokenData extends IToken, IUserTokenDetails { }
export interface IUseTokensReturn {
  tokens: IAllTokenData[];
  loading: boolean;
}

const initialTokenArray: IToken[] = allTokens;

function useTokens(): IUseTokensReturn {
  const accountLoading: boolean = useSelector<IReduxState, boolean>(state => state.account.loading);
  const accountTokensState =
    useSelector<IReduxState, Record<string, IUserTokenDetails>>(state => state.account.tokens);
  
  //@ts-ignore
  const [tokens, setTokens] = useState<IAllTokenData[]>(initialTokenArray);
  
  useEffect(() => {
    //@ts-ignore
    const tokenDetails: IAllTokenData[] = allTokens.flatMap(token => {
      if (accountTokensState[token.name]) {
        return Object.assign(token, accountTokensState[token.name]);
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
