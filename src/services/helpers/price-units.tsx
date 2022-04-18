// import { SvgIcon } from "@material-ui/core";
// import { ReactComponent as MimImg } from "@assets/images/tokens/MIM.svg";
import { IAllBondData } from '../hooks/bonds';
// import { mim } from "./bond";

export const priceUnits = (bond: IAllBondData) => {
  // if (bond.id === mim.name) return <SvgIcon component={MimImg} viewBox="0 0 32 32" style={{ height: "15px", width: "15px" }} />;
  return '$';
};
