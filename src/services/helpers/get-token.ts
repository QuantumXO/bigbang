import { IBlockchain } from '@models/blockchain';
import network from '@services/common/network';

export const getToken = (type: IBlockchain.WTF_TokenType, field: keyof IBlockchain.IToken): any => {
  const tokens: IBlockchain.IToken[] | undefined = network().getCurrentNetworkTokens || [];
  const token: IBlockchain.IToken | undefined = tokens.find(({ id }: IBlockchain.IToken) => type === id);
  let result: any = undefined;
  
  if (!!token) {
    if (field) {
      result = token[field] || 'unknown';
    } else {
      result = token;
    }
  }
  
  return result;
};