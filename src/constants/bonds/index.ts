import { Bond } from '@services/common/bond';
import FTMBonds from '@constants/bonds/ftm';
import POLYGONBonds from '@constants/bonds/polygon';
import BSCBonds from '@constants/bonds/bsc';

export default <(Bond)[]>[
  ...FTMBonds, ...POLYGONBonds, ...BSCBonds,
];