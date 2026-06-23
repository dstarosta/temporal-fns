import { interval as fn } from '../interval.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link interval}.
 */
export const interval: FPFn2<Interval<Date>, Date, Date> = convertToFP(fn, 2) as FPFn2<
  Interval<Date>,
  Date,
  Date
>;
