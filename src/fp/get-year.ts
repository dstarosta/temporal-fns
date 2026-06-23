import { getYear as fn } from '../get-year.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getYear}.
 */
export const getYear: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
