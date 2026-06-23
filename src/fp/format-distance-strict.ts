import { formatDistanceStrict as fn } from '../format-distance-strict.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link formatDistanceStrict}.
 */
export const formatDistanceStrict: FPFn2<string, Date, Date> = convertToFP(fn, 2) as FPFn2<
  string,
  Date,
  Date
>;
