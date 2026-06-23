import { formatISO as fn, type FormatISOOptions } from '../format-iso.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link formatISO} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const formatISOWithOptions: FPFn2<string, FormatISOOptions | undefined, Date | DateLike> =
  convertToFP(fn, 2) as FPFn2<string, FormatISOOptions | undefined, Date | DateLike>;
