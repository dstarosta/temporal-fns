import { formatInTimeZone as fn } from '../format-in-time-zone.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn3 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link formatInTimeZone}.
 */
export const formatInTimeZone: FPFn3<string, string, string, Date | DateLike> = convertToFP(
  fn,
  3
) as FPFn3<string, string, string, Date | DateLike>;
