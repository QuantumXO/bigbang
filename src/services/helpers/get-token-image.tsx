import TimeImg from "@assets/images/tokens/TIME.svg";
import { IBlockchain } from '@models/blockchain';

function toUrl(tokenPath: string): string {
  const host: string = window.location.origin;
  return `${host}/${tokenPath}`;
}

export function getTokenUrl(id: IBlockchain.TokenType): string {
  switch (id) {
    case 'BANG': {
      return toUrl(TimeImg);
    }
    case 'BIG': {
      return toUrl(TimeImg);
    }
    case 'dYEL': {
      return toUrl(TimeImg);
    }
    default: throw Error(`Token url doesn't support: ${id as string}`);
  }
}
