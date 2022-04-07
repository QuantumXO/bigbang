import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { IBlockchain } from "@models/blockchain";
import { BondingCalcContract } from "../abi";
import { Contract } from "ethers";
import { getBondAddresses } from "@services/helpers/get-bond-addresses";

export function getBondCalculator(networkID: IBlockchain.NetworksEnum, provider: StaticJsonRpcProvider): Contract {
  const addresses: IBlockchain.IBondMainnetAddresses = getBondAddresses(networkID);
  return new Contract(addresses?.BONDING_CALC_ADDRESS, BondingCalcContract, provider);
}
