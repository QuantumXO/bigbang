import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { IBlockchain } from '@models/blockchain';
import { BondingCalcContract } from '@services/abi';
import { Contract } from 'ethers';
import { getBondAddresses } from '@services/helpers/bond/get-bond-addresses';
import { Bond } from '@services/common/bond';

export function getBondCalculator(networkID: number, provider: StaticJsonRpcProvider, bond: Bond): Contract {
  const { isLP } = bond;
  const addresses: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
  const bondingCalcAddress: string = isLP
    ? addresses.BONDING_CALC_ADDRESS
    : '0x0000000000000000000000000000000000000000';
  return new Contract(bondingCalcAddress, BondingCalcContract, provider);
}
