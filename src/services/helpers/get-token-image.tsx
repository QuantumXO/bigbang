import BangImg from '@assets/images/common/tokens/bang.svg';
import BigImg from '@assets/images/common/tokens/big.svg';
import dYelImg from '@assets/images/common/tokens/dyel.svg';
import { IBlockchain } from '@models/blockchain';

function toUrl(tokenPath: string): string {
  const host: string = window.location.origin;
  return `${host}/${tokenPath}`;
}

export function getTokenUrl(id: IBlockchain.TokenType): string {
  switch (id) {
    case 'BANG': {
      return toUrl(BangImg);
    }
    case 'BIG': {
      return toUrl(BigImg);
    }
    case 'dYel': {
      return toUrl(dYelImg);
    }
    default: throw Error(`Token url doesn't support: ${id as string}`);
  }
}
