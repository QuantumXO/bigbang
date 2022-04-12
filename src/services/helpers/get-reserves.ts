import { Contract, ContractInterface, Signer } from 'ethers';
import { StaticJsonRpcProvider } from '@ethersproject/providers';

interface IProps {
  provider: StaticJsonRpcProvider | Signer;
  contractAddress: string;
  contractABI: ContractInterface;
  comparedAddress?: string;
}

interface IGetReserves {
  reserves: number[];
  comparedAddressInReserve?: 0 | 1;
}

export const getReserves = async (props: IProps): Promise<IGetReserves> => {
  const { contractAddress, contractABI, provider, comparedAddress = '' } = props;
  const contract: Contract = new Contract(contractAddress, contractABI, provider);
  const token0: string = (await contract.token0()).toLowerCase();
  const token1: string = (await contract.token1()).toLowerCase();
  const [reserve0, reserve1] = await contract.getReserves();
  const comparedAddressInLowerCase: string = comparedAddress.toLowerCase();
  let comparedAddressInReserve: 0 | 1 | undefined = undefined;
  
  if (token0 === comparedAddressInLowerCase) {
    comparedAddressInReserve = 0;
  } else if (token1 === comparedAddressInLowerCase) {
    comparedAddressInReserve = 1;
  }
  
  return {
    reserves: [reserve0, reserve1],
    comparedAddressInReserve,
  };
};