import { ethers } from "ethers";
import { LpReserveContract } from "../abi";
// import { mimTime } from "./bond";
import { IBlockchain } from "@models//blockchain";

export async function getMarketPrice(
  networkID: IBlockchain.NetworksEnum,
  provider: ethers.Signer | ethers.providers.Provider
): Promise<number> {
  // const mimTimeAddress = mimTime.getAddressForReserve(networkID);
  // const pairContract = new ethers.Contract(mimTimeAddress, LpReserveContract, provider);
  // const reserves = await pairContract.getReserves();
  // const marketPrice = reserves[0] / reserves[1];
  // return marketPrice;
  return 0
}
