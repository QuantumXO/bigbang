import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { BondingCalcContract } from '@services/abi';
import { Contract } from 'ethers';
import { getBondAddresses } from '@services/helpers/bond/get-bond-addresses';
import { Bond } from '@services/helpers/bond/bond';

export function getBondCalculator(networkID: number, provider: StaticJsonRpcProvider, bond: Bond): Contract {
  const { isLP } = bond;
  const { BONDING_CALC_ADDRESS } = getBondAddresses(networkID) || {};
  const bondingCalcAddress: string = (isLP && BONDING_CALC_ADDRESS)
    ? BONDING_CALC_ADDRESS
    : '0x0000000000000000000000000000000000000000';
  return new Contract(bondingCalcAddress, BondingCalcContract, provider);
}
