import { Bond } from '@services/common/bond/bond';
import { JsonRpcProvider, StaticJsonRpcProvider } from '@ethersproject/providers';
import { sleep } from '@services/helpers';
import { getNativeCurrencyInUSDC } from '@services/common/prices/get-native-currency-in-usdc'
import { getTokenInNativeCurrency } from '@services/common/prices/get-token-in-native-currency'
import { Contract } from 'ethers';
import { LpReserveContract, StableBondContract } from '@services/abi';
import { getToken } from '@services/helpers/get-token';
import { getReserves } from '@services/helpers/get-reserves';
import { IBlockchain } from '@models/blockchain';

interface IProps {
  bond: Bond;
  networkID: number;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  tokens: IBlockchain.IToken[];
}

export const getBondPrice = async (props: IProps): Promise<number> => {
  const { bond, networkID, provider, tokens } = props;
  const { bondAddress, id: bondId, isWrap: bondIsWrap, isLP: bondIsLP, networkType: bondNetworkType } = bond;
  const uSDCNativeCurrencyLPToken = tokens.find(({ isUSDCNativeCurrencyLP }: IBlockchain.IToken) => isUSDCNativeCurrencyLP);
  const nativeCurrencyInUSDC: number = await getNativeCurrencyInUSDC(networkID, provider, tokens, uSDCNativeCurrencyLPToken);
  const usdcAddress: string = getToken(tokens, 'USDC', 'address');
  let bondPrice: number = 0;
  let bondPriceInUSD: number = 0;
  
  try {
    const bondContract: Contract = new Contract(bondAddress, StableBondContract, provider);
    bondPriceInUSD = await bondContract.bondPriceInUSD();
    
    if (bondIsWrap) {
      if (bondId === 'wBNB') {
        bondPrice = bondPriceInUSD / Math.pow(10, 21);
      } else if (bondId === 'wMATIC') {
        bondPrice = bondPriceInUSD / Math.pow(10, 18);
      } else {
        bondPrice = (bondPriceInUSD / Math.pow(10, 18)) * nativeCurrencyInUSDC;
      }
    } else if (bondIsLP) {
      bondPrice = (bondPriceInUSD / Math.pow(10, 18)) * nativeCurrencyInUSDC;
    } else {
      // Tokens
      if (bondId === 'USDC') {
        bondPrice = bondPriceInUSD / Math.pow(10, 18);
      } else if (bondId === 'YFI') {
        bondPrice = bondPriceInUSD / Math.pow(10, 18);
      } else if (bondId === 'ORBS') {
        const orbsLPAddress: string = getToken(tokens, 'ORBS', 'tokenNativeCurrencyLPAddress');
  
        const {
          reserves: [reserve0, reserve1],
          comparedAddressInReserve
        } = await getReserves({
          contractAddress: orbsLPAddress,
          contractABI: LpReserveContract,
          provider,
          comparedAddress: usdcAddress,
        });
        let orbsPriceInUSDC: number = 0;
  
        if (comparedAddressInReserve === 0) {
          orbsPriceInUSDC = (reserve0 / Math.pow(10, 6)) / (reserve1 / Math.pow(10, 18));
        } else if (comparedAddressInReserve === 1) {
          orbsPriceInUSDC = (reserve1 / Math.pow(10, 18)) / (reserve0 / Math.pow(10, 6));
        }
  
        bondPrice = (bondPriceInUSD / Math.pow(10, 18)) * orbsPriceInUSDC;
      } else if (bondId === 'CRV') {
        const crvAddress: string = getToken(tokens, 'CRV', 'address')?.toLowerCase();
        const wMATICAddress: string = getToken(tokens, 'wMATIC', 'address')?.toLowerCase();
        let crvPriceInWETH: number = 0;
        let wethPriceInWMAtic: number = 0;
  
        const {
          reserves: [crvReserve0, crvReserve1],
          comparedAddressInReserve: crvComparedAddressInReserve
        } = await getReserves({
          contractAddress: '0x396E655C309676cAF0acf4607a868e0CDed876dB',
          contractABI: LpReserveContract,
          provider,
          comparedAddress: crvAddress,
        });
  
        if (crvComparedAddressInReserve === 0) {
          crvPriceInWETH = crvReserve1 / crvReserve0;
        } else if (crvComparedAddressInReserve === 1) {
          crvPriceInWETH = crvReserve0 / crvReserve1;
        } else {
          throw new Error('CRV error');
        }
  
        const {
          reserves: [wethPriceInWMaticReserve0, wethPriceInWMaticReserve1],
          comparedAddressInReserve: wMATICComparedAddressInReserve
        } = await getReserves({
          contractAddress: '0xadbf1854e5883eb8aa7baf50705338739e558e5b',
          contractABI: LpReserveContract,
          provider,
          comparedAddress: wMATICAddress,
        });
  
        if (wMATICComparedAddressInReserve === 0) {
          wethPriceInWMAtic = wethPriceInWMaticReserve0 / wethPriceInWMaticReserve1;
        } else if (wMATICComparedAddressInReserve === 1) {
          wethPriceInWMAtic = wethPriceInWMaticReserve1 / wethPriceInWMaticReserve0;
        } else {
          throw new Error('wethPriceInWMatic error');
        }
  
        const crvPriceInUSDC: number = crvPriceInWETH * wethPriceInWMAtic * nativeCurrencyInUSDC;
  
        bondPrice = crvPriceInUSDC * (bondPriceInUSD / Math.pow(10, 18));
      } else if (bondId === 'BIFI') {
        bondPrice = bondPriceInUSD / Math.pow(10, 17);
      } else if (bondId === 'STG') {
        const tokenAddress: string = getToken(tokens, bondId, 'tokenNativeCurrencyLPAddress');
        const stgTokenAddress: string = getToken(tokens, bondId, 'address');
    
        const {
          reserves: [reserve0, reserve1],
          comparedAddressInReserve
        } = await getReserves({
          contractAddress: tokenAddress,
          contractABI: LpReserveContract,
          provider,
          comparedAddress: stgTokenAddress,
        });
        let stgPriceInBUSD: number = 0;
    
        if (comparedAddressInReserve === 0) {
          stgPriceInBUSD = reserve1 / reserve0;
        } else if (comparedAddressInReserve === 1) {
          stgPriceInBUSD = reserve0 / reserve1;
        }
    
        bondPrice = (bondPriceInUSD / Math.pow(10, 18)) * stgPriceInBUSD;
      } else if (bondId === 'wMEMO') {
        const tokenInNativeCurrency: number = await getTokenInNativeCurrency(networkID, provider, bondId, tokens);
        bondPrice = (bondPriceInUSD / Math.pow(10, 18)) * tokenInNativeCurrency;
      } else {
        const tokenInNativeCurrency: number = await getTokenInNativeCurrency(networkID, provider, bondId, tokens);
        const tokenPriceInUSDC: number = tokenInNativeCurrency * nativeCurrencyInUSDC;
        bondPrice = (bondPriceInUSD / Math.pow(10, 18)) * tokenPriceInUSDC;
      }
    }
  } catch (e) {
    throw new Error('getBondPrice() Error');
  }
  
  await sleep(0.01);
  
  return bondPrice;
};
