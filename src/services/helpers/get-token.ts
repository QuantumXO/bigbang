import { IBlockchain } from '@models/blockchain';

export const getToken = (
  tokens: IBlockchain.IToken[],
  type: IBlockchain.TokenType,
  field?: keyof IBlockchain.IToken
): any => {
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