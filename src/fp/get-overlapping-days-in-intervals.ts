import { getOverlappingDaysInIntervals as fn } from '../get-overlapping-days-in-intervals.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link getOverlappingDaysInIntervals}.
 */
export const getOverlappingDaysInIntervals: FPFn2<
  number,
  Interval<Date>,
  Interval<Date>
> = convertToFP(fn, 2) as FPFn2<number, Interval<Date>, Interval<Date>>;
