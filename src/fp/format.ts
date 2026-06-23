import { format as fn } from '../format.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link format}.
 */
export const format: FPFn2<string, string, Date | DateLike> = convertToFP(fn, 2) as FPFn2<
  string,
  string,
  Date | DateLike
>;
