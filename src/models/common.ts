export declare namespace ICommon {
  export enum LinksEnum {
    'dashboard' = 'dashboard',
    'stake' = 'stake',
    'mints' = 'mints',
    'docs' = 'docs',
    'bond' = 'bond',
    'reverseBonding' = 'reverseBonding',
  }
  type IGetLinkReturn = (...args: any) => string;
  export type GetLinkType = {
    [key in LinksEnum]: IGetLinkReturn;
  }
}