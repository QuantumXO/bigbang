import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Bond } from "src/services/common/bond";
import { IBondDetails, IBondSlice } from "@store/slices/bond-slice";
import { IReduxState } from "@store/slices/state.interface";
import { IAccount } from '@models/account';
import network from '@services/common/network';

// Smash all the interfaces together to get the BondData Type
export interface IAllBondData extends Bond, IBondDetails, IAccount.IUserBondDetails { }
export interface IUseBondsReturn {
  bonds: IAllBondData[];
  loading: boolean;
}

const initialBondArray: Bond[] = network().getCurrentNetworkBonds;

// Slaps together bond data within the account & bonding states
function useBonds(): IUseBondsReturn {
  const bondLoading: boolean = useSelector<IReduxState, boolean>(state => state.bonding.loading);
  const bondState: IBondSlice = useSelector<IReduxState, IBondSlice>(state => state.bonding);
  const accountBondsState =
    useSelector<IReduxState, { [key: string]: IAccount.IUserBondDetails }>(state => state.account.bonds);
  // @ts-ignore
  const [bonds, setBonds] = useState<IAllBondData[]>(initialBondArray);
  
  useEffect((): void => {
    const bondDetails: IAllBondData[] = network().getCurrentNetworkBonds
      .flatMap((bond) => {
        if (bondState[bond.id] && bondState[bond.id].bondDiscount) {
          return Object.assign(bond, bondState[bond.id]); // Keeps the object type
        }
        return bond;
      })
      .flatMap((bond) => {
        if (accountBondsState[bond.id]) {
          return Object.assign(bond, accountBondsState[bond.id]);
        }
        return bond;
      });
    
    const mostProfitableBonds: IAllBondData[] = bondDetails
      .concat()
      .sort((a: IAllBondData, b: IAllBondData) => {
        return a["bondDiscount"] > b["bondDiscount"] ? -1 : b["bondDiscount"] > a["bondDiscount"] ? 1 : 0;
      });
    
    setBonds(mostProfitableBonds);
  }, [bondState, accountBondsState, bondLoading]);
  
  return { bonds, loading: bondLoading };
}

export default useBonds;
