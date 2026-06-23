import { areIntervalsOverlapping as fn } from '../are-intervals-overlapping.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link areIntervalsOverlapping}.
 */
export const areIntervalsOverlapping: FPFn2<boolean, Interval<Date>, Interval<Date>> = convertToFP(
  fn,
  2
) as FPFn2<boolean, Interval<Date>, Interval<Date>>;
