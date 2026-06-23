import { eachMonthOfInterval as fn } from '../each-month-of-interval.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link eachMonthOfInterval}.
 */
export const eachMonthOfInterval: FPFn1<Date[], Interval<Date>> = convertToFP(fn, 1) as FPFn1<
  Date[],
  Interval<Date>
>;
