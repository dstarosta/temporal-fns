import { toZonedDateTime as fn } from '../to-zoned-date-time.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link toZonedDateTime}.
 */
export const toZonedDateTime: FPFn2<Temporal.ZonedDateTime, string, Date | DateLike> = convertToFP(
  fn,
  2
) as FPFn2<Temporal.ZonedDateTime, string, Date | DateLike>;
