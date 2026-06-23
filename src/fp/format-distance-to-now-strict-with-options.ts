import { formatDistanceToNowStrict as fn } from '../format-distance-to-now-strict.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type DateLike } from '../types.js';
import { type FormatDistanceStrictOptions } from '../format-distance-strict.js';

/**
 * Curried, data-last variant of {@link formatDistanceToNowStrict} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const formatDistanceToNowStrictWithOptions: FPFn2<
  string,
  FormatDistanceStrictOptions | undefined,
  Date | DateLike
> = convertToFP(fn, 2) as FPFn2<string, FormatDistanceStrictOptions | undefined, Date | DateLike>;
