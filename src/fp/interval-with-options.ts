import { interval as fn, type IntervalOptions } from '../interval.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn3 } from './types.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link interval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const intervalWithOptions: FPFn3<
  Interval<Date>,
  IntervalOptions | undefined,
  Date,
  Date
> = convertToFP(fn, 3) as FPFn3<Interval<Date>, IntervalOptions | undefined, Date, Date>;
