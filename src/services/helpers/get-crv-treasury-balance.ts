import { getToken } from '@services/helpers/get-token';
import { getReserves } from '@services/helpers/get-reserves';
import { LpReserveContract, TokenContract } from '@services/abi';
import { getNativeCurrencyInUSDC } from '@services/common/prices/get-native-currency-in-usdc';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Contract } from 'ethers';
import { IBlockchain } from '@models/blockchain';
import { getBondAddresses } from '@services/helpers/bond/get-bond-addresses';

export default async (
  networkID: number,
  provider: StaticJsonRpcProvider,
  bondId: IBlockchain.TokenType,
  tokens: IBlockchain.IToken[],
): Promise<number | undefined> => {
  const { TREASURY_ADDRESS } = getBondAddresses(networkID);
  
  if (TREASURY_ADDRESS) {
    const bondTokenAddress: string = getToken(tokens, bondId, 'address');
    const tokenContract: Contract = new Contract(bondTokenAddress, TokenContract, provider);
    const tokenBalanceOf = await tokenContract.balanceOf(TREASURY_ADDRESS);
    const crvAddress: string = getToken(tokens, 'CRV', 'address')?.toLowerCase();
    const wMATICAddress: string = getToken(tokens, 'wMATIC', 'address')?.toLowerCase();
    const uSDCNativeCurrencyLPToken = tokens.find(({ isUSDCNativeCurrencyLP }: IBlockchain.IToken) => isUSDCNativeCurrencyLP);
    const nativeCurrencyInUSDC: number = await getNativeCurrencyInUSDC(networkID, provider, tokens, uSDCNativeCurrencyLPToken);
    let crvPriceInWETH: number = 0;
    let wethPriceInWMAtic: number = 0;
    let treasuryBalance: number = 0;
  
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
  
    treasuryBalance = crvPriceInUSDC * (tokenBalanceOf / Math.pow(10, 18));
  
    return treasuryBalance;
  } else {
    console.log('getCRVTreasutyBalance() error');
  }
}