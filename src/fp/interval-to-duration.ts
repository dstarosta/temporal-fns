import { intervalToDuration as fn } from '../interval-to-duration.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';
import { type Duration } from '../format-duration.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link intervalToDuration}.
 */
export const intervalToDuration: FPFn1<Duration, Interval<Date>> = convertToFP(fn, 1) as FPFn1<
  Duration,
  Interval<Date>
>;
