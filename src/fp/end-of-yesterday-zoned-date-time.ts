import { endOfYesterdayZonedDateTime as fn } from '../end-of-yesterday-zoned-date-time.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link endOfYesterdayZonedDateTime}.
 */
export const endOfYesterdayZonedDateTime: FPFn1<Temporal.ZonedDateTime, string | undefined> =
  convertToFP(fn, 1) as FPFn1<Temporal.ZonedDateTime, string | undefined>;
