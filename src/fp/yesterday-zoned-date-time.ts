import { yesterdayZonedDateTime as fn } from '../yesterday-zoned-date-time.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link yesterdayZonedDateTime}.
 */
export const yesterdayZonedDateTime: FPFn1<Temporal.ZonedDateTime, string | undefined> =
  convertToFP(fn, 1) as FPFn1<Temporal.ZonedDateTime, string | undefined>;
