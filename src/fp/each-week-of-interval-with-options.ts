import {
  eachWeekOfInterval as fn,
  type EachWeekOfIntervalOptions,
} from '../each-week-of-interval.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link eachWeekOfInterval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const eachWeekOfIntervalWithOptions: FPFn2<
  Date[],
  EachWeekOfIntervalOptions | undefined,
  Interval<Date>
> = convertToFP(fn, 2) as FPFn2<Date[], EachWeekOfIntervalOptions | undefined, Interval<Date>>;
