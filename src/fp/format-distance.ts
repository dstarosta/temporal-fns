import { formatDistance as fn } from '../format-distance.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link formatDistance}.
 */
export const formatDistance: FPFn2<string, Date, Date> = convertToFP(fn, 2) as FPFn2<
  string,
  Date,
  Date
>;
