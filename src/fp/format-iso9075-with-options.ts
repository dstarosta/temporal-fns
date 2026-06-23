import { formatISO9075 as fn, type FormatISO9075Options } from '../format-iso9075.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link formatISO9075} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const formatISO9075WithOptions: FPFn2<
  string,
  FormatISO9075Options | undefined,
  Date | DateLike
> = convertToFP(fn, 2) as FPFn2<string, FormatISO9075Options | undefined, Date | DateLike>;
