import axios from "axios";
import { IBlockchain } from '@models/blockchain';

type ICache = {
  [key in IBlockchain.WTF_TokenType]?: number;
};

const cache: ICache = {};

const url: string = 'https://api.coingecko.com/api/v3/simple/price?ids=fantom,usd-coin&vs_currencies=usd';

export const loadTokenPrices = async (): Promise<void> => {
  const { data } = await axios.get(url);
  
  cache['FTM'] = data['fantom']?.usd;
  cache['USDC'] = data['usd-coin']?.usd;
};

export const getTokenPrice = (symbol: IBlockchain.WTF_TokenType): number => Number(cache[symbol]);
