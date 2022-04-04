import { ethers } from "ethers";
import { getBondAddresses } from "@constants/index";
import { BangTokenContract, StakingContract, StakingHelperContract, BigTokenContract } from "@services/abi";
import { clearPendingTxn, fetchPendingTxns, getStakingTypeText } from "./pending-txns-slice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAccountSuccess, getBalances } from "./account-slice";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { IBlockchain } from "@models/blockchain";
import { info, success, warning } from "@store/slices/messages-slice";
import { messages } from "@constants/messages";
import { getGasPrice } from "@services/helpers/get-gas-price";
import { metamaskErrorWrap } from "@services/helpers/metamask-error-wrap";
import { sleep } from "@services/helpers";

interface IChangeApproval {
  token: string;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  address: string;
  networkID: IBlockchain.NetworksEnum;
}

export const changeApproval = createAsyncThunk(
  "stake/changeApproval",
  async ({ token, provider, address, networkID }: IChangeApproval, { dispatch }) => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    const addresses = getBondAddresses(networkID);
    
    const signer = provider.getSigner();
    const timeContract = new ethers.Contract(addresses.BIG_ADDRESS, BigTokenContract, signer);
    const memoContract = new ethers.Contract(addresses.BANG_ADDRESS, BangTokenContract, signer);
    
    let approveTx;
    try {
      const gasPrice = await getGasPrice(provider);
      
      if (token === "big") {
        approveTx = await timeContract.approve(addresses.STAKING_HELPER_ADDRESS, ethers.constants.MaxUint256, { gasPrice });
      }
      
      if (token === "bang") {
        approveTx = await memoContract.approve(addresses.STAKING_ADDRESS, ethers.constants.MaxUint256, { gasPrice });
      }
      
      const text = "Approve " + (token === "big" ? "Staking" : "Unstaking");
      const pendingTxnType = token === "big" ? "approve_staking" : "approve_unstaking";
      
      dispatch(fetchPendingTxns({ txnHash: approveTx.hash, text, type: pendingTxnType }));
      await approveTx.wait();
      dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
      return metamaskErrorWrap(err, dispatch);
    } finally {
      if (approveTx) {
        dispatch(clearPendingTxn(approveTx.hash));
      }
    }
  
    await sleep(2);
    
    const stakeAllowance = await timeContract.allowance(address, addresses.STAKING_HELPER_ADDRESS);
    const unstakeAllowance = await memoContract.allowance(address, addresses.STAKING_ADDRESS);
    
    return dispatch(
      fetchAccountSuccess({
        staking: {
          timeStake: Number(stakeAllowance),
          memoUnstake: Number(unstakeAllowance)
        }
      })
    );
  }
);

interface IChangeStake {
  action: string;
  value: string;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  address: string;
  networkID: IBlockchain.NetworksEnum;
}

export const changeStake = createAsyncThunk("stake/changeStake", async ({
                                                                          action,
                                                                          value,
                                                                          provider,
                                                                          address,
                                                                          networkID
                                                                        }: IChangeStake, { dispatch }) => {
  if (!provider) {
    dispatch(warning({ text: messages.please_connect_wallet }));
    return;
  }
  const addresses = getBondAddresses(networkID);
  const signer = provider.getSigner();
  const staking = new ethers.Contract(addresses.STAKING_ADDRESS, StakingContract, signer);
  const stakingHelper = new ethers.Contract(addresses.STAKING_HELPER_ADDRESS, StakingHelperContract, signer);
  
  let stakeTx;
  
  try {
    const gasPrice = await getGasPrice(provider);
    
    if (action === "stake") {
      stakeTx = await stakingHelper.stake(ethers.utils.parseUnits(value, "gwei"), address, { gasPrice });
    } else {
      stakeTx = await staking.unstake(ethers.utils.parseUnits(value, "gwei"), true, { gasPrice });
    }
    const pendingTxnType = action === "stake" ? "staking" : "unstaking";
    dispatch(fetchPendingTxns({ txnHash: stakeTx.hash, text: getStakingTypeText(action), type: pendingTxnType }));
    await stakeTx.wait();
    dispatch(success({ text: messages.tx_successfully_send }));
  } catch (err: any) {
    return metamaskErrorWrap(err, dispatch);
  } finally {
    if (stakeTx) {
      dispatch(clearPendingTxn(stakeTx.hash));
    }
  }
  dispatch(info({ text: messages.your_balance_update_soon }));
  await sleep(10);
  await dispatch(getBalances({ address, networkID, provider }));
  dispatch(info({ text: messages.your_balance_updated }));
  return;
});
