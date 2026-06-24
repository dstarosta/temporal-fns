import { formatInTimeZone as fn } from '../format-in-time-zone.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn4 } from './types.js';
import { type DateLike } from '../types.js';
import { type FormatOptions } from '../format.js';

/**
 * Curried, data-last variant of {@link formatInTimeZone} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const formatInTimeZoneWithOptions: FPFn4<
  string,
  FormatOptions | undefined,
  string,
  string,
  Date | DateLike
> = convertToFP(fn, 4) as FPFn4<string, FormatOptions | undefined, string, string, Date | DateLike>;
