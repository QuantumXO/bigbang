import axios from "axios";

const cache: {
  FTM?: number;
  USDC?: number;
} = {};

const url = 'https://api.coingecko.com/api/v3/simple/price?ids=fantom,usd-coin&vs_currencies=usd';

export const loadTokenPrices = async () => {
  const { data } = await axios.get(url);
  
  cache['FTM'] = data['fantom']?.usd;
  cache['USDC'] = data['usd-coin']?.usd;
};

export const getTokenPrice = (symbol: string): number => Number(cache[symbol]);
