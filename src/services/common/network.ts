import { Bond } from '@services/common/bond';
import { IBlockchain } from '@models/blockchain';
import tokensAssets from '@constants/tokens';
import { ACTIVE_NETWORKS } from '@constants/networks';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { getBondAddresses, sleep } from '@services/helpers';
import { getToken } from '@services/helpers/get-token';
import { Contract, ethers } from 'ethers';
import { dYelTokenContract, LPTokenContract, TokenContract } from '@services/abi';
import { getNativeCurrencyInUSDC } from '@services/common/prices/get-native-currency-in-usdc';
import { getReserves } from '@services/helpers/get-reserves';
import getCrvTreasuryBalance from '@services/helpers/get-crv-treasury-balance';
import { getTokenInNativeCurrency } from '@services/common/prices/get-token-in-native-currency';

export const onMapCurrentNetworkTokens = (network: IBlockchain.INetwork, bonds: Bond[]): IBlockchain.IToken[] => {
  let result: IBlockchain.IToken[] = [];
  
  if (network) {
    const { tokens, nativeCurrency } = network;
    result = tokens
      .map(({ id, address, tokenNativeCurrencyLPAddress }: IBlockchain.INetworkToken): IBlockchain.IToken | undefined => {
        const tokenAsset: IBlockchain.ITokenAsset | undefined = tokensAssets
          .find(({ id: tokenAssetId }: IBlockchain.ITokenAsset) => tokenAssetId === id);
        const bondIcon: string | undefined = bonds.find(({ id: bondId }: Bond) => bondId === id)?.bondIcon;
        if (tokenAsset) {
          return {
            ...tokenAsset,
            icon: bondIcon,
            id,
            address,
            tokenNativeCurrencyLPAddress,
          };
        }
      })
      .filter((item: IBlockchain.INetworkToken | undefined) => !!item) as IBlockchain.IToken[];
    
    const nativeCurrencyAsset: IBlockchain.ITokenAsset | undefined = tokensAssets
      .find(({ id: tokenAssetId }: IBlockchain.ITokenAsset) => tokenAssetId === nativeCurrency.id);
    const nativeCurrencyBondIcon: string | undefined = bonds
      .find(({ id: bondId }: Bond) => bondId === nativeCurrency.id)?.bondIcon;
    
    if (nativeCurrencyAsset) {
      const { id, address } = nativeCurrency;
      const nativeCurrencyToken: IBlockchain.IToken = {
        ...nativeCurrencyAsset,
        icon: nativeCurrencyBondIcon,
        id,
        address,
        isNativeCurrency: true,
      };
      result.push(nativeCurrencyToken);
    }
  }
  
  return result;
}

export const getCurrentNetwork = (chainId: string): IBlockchain.INetwork | undefined => {
  return ACTIVE_NETWORKS
    .find(({ chainId: activeNetworkChainId }: IBlockchain.INetwork) => activeNetworkChainId === chainId);
};

export const getTreasuryBalance = async (
  bond: Bond,
  tokens: IBlockchain.IToken[],
  networkID: number,
  provider: StaticJsonRpcProvider
): Promise<number> => {
  const { id: bondId, isLP: bondIsLP, isWrap: bondIsWrap } = bond;
  const addresses = getBondAddresses(networkID);
  
  const bondTokenAddress: string = getToken(tokens, bondId, 'address');
  const tokenContract: Contract = new Contract(bondTokenAddress, TokenContract, provider);
  const tokenBalanceOf = await tokenContract.balanceOf(addresses?.TREASURY_ADDRESS);
  const bigNativeCurrencyLPToken = tokens.find(({ isBigNativeCurrencyLP }: IBlockchain.IToken) => isBigNativeCurrencyLP);
  const uSDCNativeCurrencyLPToken = tokens.find(({ isUSDCNativeCurrencyLP }: IBlockchain.IToken) => isUSDCNativeCurrencyLP);
  const nativeCurrencyInUSDC: number = await getNativeCurrencyInUSDC(networkID, provider, tokens, uSDCNativeCurrencyLPToken);
  let treasuryBalance: number = 0;
  
  if (bondId === 'USDC') {
    treasuryBalance = tokenBalanceOf / Math.pow(10, 6);
  } else if (bondIsWrap) {
    treasuryBalance = (tokenBalanceOf / Math.pow(10, 18)) * nativeCurrencyInUSDC;
  } else if (bondIsLP) {
    const lpContractAddress: string = bigNativeCurrencyLPToken?.address || 'unknown';
    const lpContract = new Contract(lpContractAddress, LPTokenContract, provider);
    const lpBalanceOf = await lpContract.balanceOf(addresses?.TREASURY_ADDRESS);
    const wrapTokenAddress: string | undefined = tokens
      .find(({ isWrap }: IBlockchain.IToken) => isWrap)?.address;
    const totalSupply: number = (await lpContract.totalSupply());
    
    let lpPriceInUSDC;
    
    if (wrapTokenAddress) {
      const { reserves: [reserve0, reserve1], comparedAddressInReserve } = await getReserves({
        contractAddress: lpContractAddress,
        contractABI: LPTokenContract,
        provider,
        comparedAddress: wrapTokenAddress,
      });
      
      if (comparedAddressInReserve === 0) {
        lpPriceInUSDC = ((((reserve0 / Math.pow(10, 18)) * 2) * nativeCurrencyInUSDC) / (totalSupply / Math.pow(10, 18)));
      } else if (comparedAddressInReserve === 1) {
        lpPriceInUSDC = ((((reserve1 / Math.pow(10, 18)) * 2) * nativeCurrencyInUSDC) / (totalSupply / Math.pow(10, 18)));
      } else {
        throw new Error('No existed wrapTokenAddress in reserves');
      }
    } else {
      throw new Error('wrapTokenAddress Error');
    }
    treasuryBalance = (lpBalanceOf / Math.pow(10, 18)) * lpPriceInUSDC;
  } else if (bondId === 'CRV') {
    treasuryBalance = await getCrvTreasuryBalance(networkID, provider, bondId, tokens) || 0;
  } else {
    const tokenInNativeCurrency: number = await getTokenInNativeCurrency(networkID, provider, bondId, tokens);
    const tokenPriceInUSDC: number = tokenInNativeCurrency * nativeCurrencyInUSDC;
    treasuryBalance = tokenBalanceOf / Math.pow(10, 18) * tokenPriceInUSDC
  }
  
  await sleep(0.01);
  
  return treasuryBalance;
}

export const getTokenAmount = async (
  bond: Bond,
  tokens: IBlockchain.IToken[],
  networkID: number,
  provider: StaticJsonRpcProvider
): Promise<number> => getTreasuryBalance(bond, tokens, networkID, provider);