import { sliceInterval as fn } from '../slice-interval.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn4 } from './types.js';
import { type Duration } from '../format-duration.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link sliceInterval}.
 */
export const sliceInterval: FPFn4<
  Interval<Date> | null,
  number | undefined,
  number,
  Duration,
  Interval<Date>
> = convertToFP(fn, 4) as FPFn4<
  Interval<Date> | null,
  number | undefined,
  number,
  Duration,
  Interval<Date>
>;
