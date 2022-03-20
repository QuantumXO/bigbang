import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { IBlockchain } from "@models/blockchain";
import { BondingCalcContract } from "../abi";
import { ethers } from "ethers";
import { getAddresses } from "@constants/addresses";

export function getBondCalculator(networkID: IBlockchain.NetworksEnum, provider: StaticJsonRpcProvider) {
  const addresses = getAddresses(networkID);
  return new ethers.Contract(addresses.TIME_BONDING_CALC_ADDRESS, BondingCalcContract, provider);
}
