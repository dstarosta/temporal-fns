import { isWithinInterval as fn } from '../is-within-interval.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link isWithinInterval}.
 */
export const isWithinInterval: FPFn2<boolean, Interval<Date>, Date> = convertToFP(fn, 2) as FPFn2<
  boolean,
  Interval<Date>,
  Date
>;
