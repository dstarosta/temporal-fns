import { formatDistance as fn, type FormatDistanceOptions } from '../format-distance.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn3 } from './types.js';

/**
 * Curried, data-last variant of {@link formatDistance} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const formatDistanceWithOptions: FPFn3<
  string,
  FormatDistanceOptions | undefined,
  Date,
  Date
> = convertToFP(fn, 3) as FPFn3<string, FormatDistanceOptions | undefined, Date, Date>;
