import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import allBonds from "../helpers/bond";
import { Bond } from "../helpers/bond/bond";
import { IBondDetails, IBondSlice } from "@store/slices/bond-slice";
import { IReduxState } from "@store/slices/state.interface";
import { StableBond } from '@services/helpers/bond/stable-bond';
import { LPBond } from '@services/helpers/bond/lp-bond';
import { IAccount } from '@models/account';

// Smash all the interfaces together to get the BondData Type
export interface IAllBondData extends Bond, IBondDetails, IAccount.IUserBondDetails { }
export interface IUseBondsReturn {
  bonds: IAllBondData[];
  loading: boolean;
}

const initialBondArray: (StableBond | LPBond)[] = allBonds;

// Slaps together bond data within the account & bonding states
function useBonds(): IUseBondsReturn {
  const bondLoading: boolean = useSelector<IReduxState, boolean>(state => state.bonding.loading);
  const bondState: IBondSlice = useSelector<IReduxState, IBondSlice>(state => state.bonding);
  const accountBondsState =
    useSelector<IReduxState, { [key: string]: IAccount.IUserBondDetails }>(state => state.account.bonds);
  // @ts-ignore
  const [bonds, setBonds] = useState<IAllBondData[]>(initialBondArray);
  
  useEffect((): void => {
    const bondDetails: IAllBondData[] = allBonds
      .flatMap((bond) => {
        if (bondState[bond.name] && bondState[bond.name].bondDiscount) {
          return Object.assign(bond, bondState[bond.name]); // Keeps the object type
        }
        return bond;
      })
      .flatMap((bond) => {
        if (accountBondsState[bond.name]) {
          return Object.assign(bond, accountBondsState[bond.name]);
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
