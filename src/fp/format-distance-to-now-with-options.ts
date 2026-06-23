import { formatDistanceToNow as fn } from '../format-distance-to-now.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type DateLike } from '../types.js';
import { type FormatDistanceOptions } from '../format-distance.js';

/**
 * Curried, data-last variant of {@link formatDistanceToNow} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const formatDistanceToNowWithOptions: FPFn2<
  string,
  FormatDistanceOptions | undefined,
  Date | DateLike
> = convertToFP(fn, 2) as FPFn2<string, FormatDistanceOptions | undefined, Date | DateLike>;
