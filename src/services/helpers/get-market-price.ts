import { ethers } from "ethers";
import { LpReserveContract } from "../abi";
import { mimTime } from "./bond";
import { Networks } from "@constants/blockchain";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
  const mimTimeAddress = mimTime.getAddressForReserve(networkID);
  const pairContract = new ethers.Contract(mimTimeAddress, LpReserveContract, provider);
  const reserves = await pairContract.getReserves();
  const marketPrice = reserves[0] / reserves[1];
  return marketPrice;
}
