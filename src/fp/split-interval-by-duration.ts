import { splitIntervalByDuration as fn } from '../split-interval-by-duration.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type Duration } from '../format-duration.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link splitIntervalByDuration}.
 */
export const splitIntervalByDuration: FPFn2<
  Interval<Date>[],
  Duration,
  Interval<Date>
> = convertToFP(fn, 2) as FPFn2<Interval<Date>[], Duration, Interval<Date>>;
