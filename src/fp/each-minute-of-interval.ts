import { eachMinuteOfInterval as fn } from '../each-minute-of-interval.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link eachMinuteOfInterval}.
 */
export const eachMinuteOfInterval: FPFn1<Date[], Interval<Date>> = convertToFP(fn, 1) as FPFn1<
  Date[],
  Interval<Date>
>;
