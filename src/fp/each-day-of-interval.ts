import { eachDayOfInterval as fn } from '../each-day-of-interval.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link eachDayOfInterval}.
 */
export const eachDayOfInterval: FPFn1<Date[], Interval<Date>> = convertToFP(fn, 1) as FPFn1<
  Date[],
  Interval<Date>
>;
