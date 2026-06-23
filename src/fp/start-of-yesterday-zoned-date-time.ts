import { startOfYesterdayZonedDateTime as fn } from '../start-of-yesterday-zoned-date-time.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link startOfYesterdayZonedDateTime}.
 */
export const startOfYesterdayZonedDateTime: FPFn1<Temporal.ZonedDateTime, string | undefined> =
  convertToFP(fn, 1) as FPFn1<Temporal.ZonedDateTime, string | undefined>;
