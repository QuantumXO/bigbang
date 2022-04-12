import { Bond } from '@services/common/bond';
import { JsonRpcProvider, StaticJsonRpcProvider } from '@ethersproject/providers';
import { getLPInNativeCurrency, getNativeCurrencyInUSDC, getTokenInNativeCurrency } from '@services/helpers';
import { Contract } from 'ethers';
import { LpReserveContract, StableBondContract } from '@services/abi';
import { getToken } from '@services/helpers/get-token';
import { getReserves } from '@services/helpers/get-reserves';

interface IProps {
  bond: Bond;
  networkID: number;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
}

export const getBondPrice = async (props: IProps): Promise<number> => {
  const { bond, networkID, provider } = props;
  const { bondAddress, id: bondId, isWrap: bondIsWrap, isLP: bondIsLP } = bond;
  const nativeCurrencyInUSDC: number = await getNativeCurrencyInUSDC(networkID, provider);
  let bondPrice: number = 0;
  let bondPriceInUSD: number = 0;
  
  try {
    const bondContract: Contract = new Contract(bondAddress, StableBondContract, provider);
    bondPriceInUSD = await bondContract.bondPriceInUSD();
    
    if (bondId === 'USDC') {
      bondPrice = bondPriceInUSD / Math.pow(10, 6);
    } else if (bondIsWrap) {
      bondPrice = (bondPriceInUSD / Math.pow(10, 18)) * nativeCurrencyInUSDC; // in bond token
    } else if (bondId === 'CRV') {
      const crvAddress: string = getToken('CRV', 'address')?.toLowerCase();
      const wMATICAddress: string = getToken('wMATIC', 'address')?.toLowerCase();
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
  
      const crvPriceInUSDC = crvPriceInWETH * wethPriceInWMAtic * nativeCurrencyInUSDC;
  
      bondPrice = crvPriceInUSDC * (bondPriceInUSD / Math.pow(10, 18));
    } else if (bondIsLP) {
      // const lpPriceInUSDC = (await getLPInNativeCurrency(bond.id, networkID, provider)) * nativeCurrencyInUSDC
      // bondPrice = (bondPriceInUSD / Math.pow(10, 18)) * lpPriceInUSDC;
      // #TODO check
      bondPrice = (bondPriceInUSD / Math.pow(10, 18)) * nativeCurrencyInUSDC;
    } else {
      // Tokens
      const tokenPriceInUSDC = (await getTokenInNativeCurrency(bond.id, networkID, provider)) * nativeCurrencyInUSDC
      bondPrice = (bondPriceInUSD / Math.pow(10, 18)) * tokenPriceInUSDC;
    }
  } catch (e) {
    throw new Error('getBondPrice() Error');
  }
  
  return bondPrice;
};
