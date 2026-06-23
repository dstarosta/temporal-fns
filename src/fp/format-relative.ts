import { formatRelative as fn } from '../format-relative.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link formatRelative}.
 */
export const formatRelative: FPFn2<string, Date, Date> = convertToFP(fn, 2) as FPFn2<
  string,
  Date,
  Date
>;
