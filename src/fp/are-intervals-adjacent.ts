import { areIntervalsAdjacent as fn } from '../are-intervals-adjacent.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link areIntervalsAdjacent}.
 */
export const areIntervalsAdjacent: FPFn2<boolean, Interval<Date>, Interval<Date>> = convertToFP(
  fn,
  2
) as FPFn2<boolean, Interval<Date>, Interval<Date>>;
