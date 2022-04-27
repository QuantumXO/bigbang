export declare namespace ICommon {
  export enum LinksEnum {
    'dashboard' = 'dashboard',
    'stake' = 'stake',
    'calculator' = 'calculator',
    'mints' = 'mints',
    'fund' = 'fund',
    'docs' = 'docs',
    'bond' = 'bond',
    'reverseBonding' = 'reverseBonding',
  }
  type IGetLinkReturn = (...args: any) => string;
  export type GetLinkType = {
    [key in LinksEnum]: IGetLinkReturn;
  }
}