import {
  areIntervalsOverlapping as fn,
  type AreIntervalsOverlappingOptions,
} from '../are-intervals-overlapping.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn3 } from './types.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link areIntervalsOverlapping} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const areIntervalsOverlappingWithOptions: FPFn3<
  boolean,
  AreIntervalsOverlappingOptions | undefined,
  Interval<Date>,
  Interval<Date>
> = convertToFP(fn, 3) as FPFn3<
  boolean,
  AreIntervalsOverlappingOptions | undefined,
  Interval<Date>,
  Interval<Date>
>;
