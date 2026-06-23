import { eachDayOfInterval as fn } from '../each-day-of-interval.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type EachOfIntervalOptions } from '../helpers/create-each-of-interval.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link eachDayOfInterval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const eachDayOfIntervalWithOptions: FPFn2<
  Date[],
  EachOfIntervalOptions | undefined,
  Interval<Date>
> = convertToFP(fn, 2) as FPFn2<Date[], EachOfIntervalOptions | undefined, Interval<Date>>;
