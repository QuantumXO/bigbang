import { Bond } from '@services/common/bond';
import { JsonRpcProvider, StaticJsonRpcProvider } from '@ethersproject/providers';
import { getNativeCurrencyInUSDC, getTokenInNativeCurrency } from '@services/helpers';
import { Contract } from 'ethers';
import { LpReserveContract, StableBondContract } from '@services/abi';
import { getToken } from '@services/helpers/get-token';

interface IProps {
  bond: Bond;
  networkID: number;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
}

export const getBondPrice = async (props: IProps): Promise<number> => {
  const { bond, networkID, provider } = props;
  const { bondAddress, id: bondId, isWrap: bondIsWrap } = bond;
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
      const crvPriceInWETHContract = new Contract('0x396E655C309676cAF0acf4607a868e0CDed876dB', LpReserveContract, provider);
      const crvAddress: string = getToken('CRV', 'address')?.toLowerCase();
      const [crvReserve0, crvReserve1] = await crvPriceInWETHContract.getReserves();
      const srvToken0Address: string = (await crvPriceInWETHContract.token0()).toLowerCase();
      const srvToken1Address: string = (await crvPriceInWETHContract.token1()).toLowerCase();
      let crvPriceInWETH: number = 0;
  
      if (srvToken0Address === crvAddress) {
        crvPriceInWETH = crvReserve1 / crvReserve0;
      } else if (srvToken1Address === crvAddress) {
        crvPriceInWETH = crvReserve0 / crvReserve1;
      } else {
        throw new Error('CRV error');
      }
  
      const wethPriceInWMaticContract = new Contract('0xadbf1854e5883eb8aa7baf50705338739e558e5b', LpReserveContract, provider);
  
      const wMATICAddress: string = getToken('wMATIC', 'address')?.toLowerCase();
      const wethPriceInWMatic0Address: string = (await wethPriceInWMaticContract.token0()).toLowerCase();
      const wethPriceInWMatic1Address: string = (await wethPriceInWMaticContract.token1()).toLowerCase();
      const [wethPriceInWMaticReserve0, wethPriceInWMaticReserve1] = await wethPriceInWMaticContract.getReserves();
      let wethPriceInWMAtic: number = 0;
  
      if (wethPriceInWMatic0Address === wMATICAddress) {
        wethPriceInWMAtic = wethPriceInWMaticReserve0 / wethPriceInWMaticReserve1;
      } else if (wethPriceInWMatic1Address === wMATICAddress) {
        wethPriceInWMAtic = wethPriceInWMaticReserve1 / wethPriceInWMaticReserve0;
      } else {
        throw new Error('wethPriceInWMatic error');
      }
  
      const crvPriceInUSDC = crvPriceInWETH * wethPriceInWMAtic * nativeCurrencyInUSDC;
  
      bondPrice = crvPriceInUSDC * (bondPriceInUSD / Math.pow(10, 18));
    } else {
      const tokenPriceInUSDC = (await getTokenInNativeCurrency(bond.id, networkID, provider)) * nativeCurrencyInUSDC
      // LP and tokens
      bondPrice = (bondPriceInUSD / Math.pow(10, 18)) * tokenPriceInUSDC; // in bond token
    }
  } catch (e) {
    throw new Error('getBondPrice() Error');
  }
  
  return bondPrice;
};
