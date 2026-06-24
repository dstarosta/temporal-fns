import { countIntervalUnits as fn } from '../count-interval-units.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link countIntervalUnits}.
 */
export const countIntervalUnits: FPFn2<
  number,
  keyof import('../format-duration.js').Duration,
  Interval<Date>
> = convertToFP(fn, 2) as FPFn2<
  number,
  keyof import('../format-duration.js').Duration,
  Interval<Date>
>;
