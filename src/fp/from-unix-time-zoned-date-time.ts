import { fromUnixTimeZonedDateTime as fn } from '../from-unix-time-zoned-date-time.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link fromUnixTimeZonedDateTime}.
 */
export const fromUnixTimeZonedDateTime: FPFn2<Temporal.ZonedDateTime, string | undefined, number> =
  convertToFP(fn, 2) as FPFn2<Temporal.ZonedDateTime, string | undefined, number>;
