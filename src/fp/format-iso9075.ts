import { formatISO9075 as fn } from '../format-iso9075.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link formatISO9075}.
 */
export const formatISO9075: FPFn1<string, Date | DateLike> = convertToFP(fn, 1) as FPFn1<
  string,
  Date | DateLike
>;
