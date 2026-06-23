import { formatRFC3339 as fn, type FormatRFC3339Options } from '../format-rfc3339.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link formatRFC3339} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const formatRFC3339WithOptions: FPFn2<
  string,
  FormatRFC3339Options | undefined,
  Date | DateLike
> = convertToFP(fn, 2) as FPFn2<string, FormatRFC3339Options | undefined, Date | DateLike>;
