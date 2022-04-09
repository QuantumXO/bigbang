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
      calculator: (): string => `/calculator`,
      mints: (): string => `/mints`,
      fund: (): string => `/fund`,
      docs: (): string => '/',
      bond: (bondName: string): string => `/mints/${bondName}`,
    };
  }
}

const linkUrl = (args?: any) => new LinkUrl(args);

export default linkUrl;