import { format as fn, type FormatOptions } from '../format.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn3 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link format} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const formatWithOptions: FPFn3<string, FormatOptions | undefined, string, Date | DateLike> =
  convertToFP(fn, 3) as FPFn3<string, FormatOptions | undefined, string, Date | DateLike>;
