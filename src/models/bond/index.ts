import { IBlockchain } from '@models/blockchain';

export namespace IBond {
  export interface IUserData {
    id: string;
    label: string;
    value: string | number;
    isDivided?: boolean;
  }
  export type IBondType = IBlockchain.WTF_TokenType;
}