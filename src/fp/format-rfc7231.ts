import { formatRFC7231 as fn } from '../format-rfc7231.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link formatRFC7231}.
 */
export const formatRFC7231: FPFn1<string, Date> = convertToFP(fn, 1) as FPFn1<string, Date>;
