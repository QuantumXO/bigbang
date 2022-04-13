import { Bond } from '@services/common/bond';
import FTMBonds from '@constants/bonds/ftm';
import POLYGONBonds from '@constants/bonds/polygon';

export default <(Bond)[]>[
  ...FTMBonds, ...POLYGONBonds,
];