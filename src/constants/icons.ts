import { IBlockchain } from '@models/blockchain';

import wFTM from '@assets/images/common/tokens/ftm.svg';
import SCREAM from '@assets/images/common/tokens/SCREAM.svg';
import GEIST from '@assets/images/common/tokens/GEIST.svg';
import USDC from '@assets/images/common/tokens/USDC.svg';
import TSHARE from '@assets/images/common/tokens/TSHARE.svg';
import MULTI from '@assets/images/common/tokens/MULTI.svg';
import BOO from '@assets/images/common/tokens/BOO.svg';
import wMATIC from '@assets/images/common/tokens/MATIC.svg';
import dYel from '@assets/images/common/tokens/dYel.png';
import BEETS from '@assets/images/common/tokens/BEETS.svg';
import YFI from '@assets/images/common/tokens/YFI.svg';
import LINK from '@assets/images/common/tokens/LINK.svg';
import SPIRIT from '@assets/images/common/tokens/SPIRIT.svg';
import QUICK from '@assets/images/common/tokens/QUICK.svg';
import CRV from '@assets/images/common/tokens/CRV.svg';
import SAND from '@assets/images/common/tokens/SAND.svg';
import ORBS from '@assets/images/common/tokens/ORBS.svg';
import YEL from '@assets/images/common/tokens/YEL.svg';
import QI from '@assets/images/common/tokens/QI.svg';
import BNB from '@assets/images/common/tokens/BNB.svg';
import CAKE from '@assets/images/common/tokens/CAKE.svg';
import BIFI from '@assets/images/common/tokens/BIFI.svg';
import UNI from '@assets/images/common/tokens/UNI.svg';
import MBOX from '@assets/images/common/tokens/MBOX.svg';
import ALPACA from '@assets/images/common/tokens/ALPACA.svg';
import STG from '@assets/images/common/tokens/STG.svg';
import AVAX from '@assets/images/common/tokens/AVAX.svg';
import JOE from '@assets/images/common/tokens/JOE.svg';
import PTP from '@assets/images/common/tokens/PTP.svg';
import SPELL from '@assets/images/common/tokens/SPELL.svg';
import AAVE from '@assets/images/common/tokens/AAVE.svg';
import wMEMO from '@assets/images/common/tokens/wMEMO.svg';
import wETH from '@assets/images/common/tokens/ETH.svg';
import SUSHI from '@assets/images/common/tokens/SUSHI.svg';
import CVX from '@assets/images/common/tokens/CVX.svg';
import ALCX from '@assets/images/common/tokens/ALCX.svg';
import MKR from '@assets/images/common/tokens/MKR.svg';
import COMP from '@assets/images/common/tokens/COMP.svg';
import FARM from '@assets/images/common/tokens/FARM.svg';
import BAL from '@assets/images/common/tokens/BAL.svg';
import BIG from '@assets/images/common/tokens/big.png';

const tokens: Record<IBlockchain.TokenType | string, any> = {
  wFTM, SCREAM, GEIST, USDC, TSHARE, MULTI, BOO, wMATIC, BEETS, YFI, LINK, SPELL, SPIRIT, QUICK, CRV, SUSHI, CVX, ALCX,
  SAND, ORBS, YEL, QI, BNB, CAKE, BIFI, UNI, MBOX, ALPACA, STG, AVAX, JOE, dYel, PTP, AAVE, wMEMO, wETH, MKR, COMP,
  FARM, BAL, BIG
};

export default tokens;