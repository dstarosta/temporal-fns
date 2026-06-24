import { intersectIntervals as fn } from '../intersect-intervals.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link intersectIntervals}.
 */
export const intersectIntervals: FPFn2<
  Interval<Date> | null,
  Interval<Date>,
  Interval<Date>
> = convertToFP(fn, 2) as FPFn2<Interval<Date> | null, Interval<Date>, Interval<Date>>;
