import { unionIntervals as fn } from '../union-intervals.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link unionIntervals}.
 */
export const unionIntervals: FPFn2<Interval<Date>, Interval<Date>, Interval<Date>> = convertToFP(
  fn,
  2
) as FPFn2<Interval<Date>, Interval<Date>, Interval<Date>>;
