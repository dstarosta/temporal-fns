import {
  formatDistanceStrict as fn,
  type FormatDistanceStrictOptions,
} from '../format-distance-strict.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn3 } from './types.js';

/**
 * Curried, data-last variant of {@link formatDistanceStrict} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const formatDistanceStrictWithOptions: FPFn3<
  string,
  FormatDistanceStrictOptions | undefined,
  Date,
  Date
> = convertToFP(fn, 3) as FPFn3<string, FormatDistanceStrictOptions | undefined, Date, Date>;
