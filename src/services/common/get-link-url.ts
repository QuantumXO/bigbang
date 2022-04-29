import { ICommon } from '@models/common';

export class LinkUrl {
  args: any;
  
  constructor(args?: any) {
    this.args = args;
  }
  
  get get(): ICommon.GetLinkType {
    return {
      dashboard: (): string => `/dashboard`,
      stake: (): string => `/stake`,
      mints: (): string => `/mints`,
      docs: (): string => '/',
      reverseBonding: (): string => '/reverse-bonding',
      bond: (bondName: string): string => `/mints/${bondName}`,
    };
  }
}

const linkUrl = (args?: any) => new LinkUrl(args);

export default linkUrl;