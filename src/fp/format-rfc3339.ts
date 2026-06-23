import { formatRFC3339 as fn } from '../format-rfc3339.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link formatRFC3339}.
 */
export const formatRFC3339: FPFn1<string, Date | DateLike> = convertToFP(fn, 1) as FPFn1<
  string,
  Date | DateLike
>;
