import { areIntervalsEquivalent as fn } from '../are-intervals-equivalent.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link areIntervalsEquivalent}.
 */
export const areIntervalsEquivalent: FPFn2<boolean, Interval<Date>, Interval<Date>> = convertToFP(
  fn,
  2
) as FPFn2<boolean, Interval<Date>, Interval<Date>>;
