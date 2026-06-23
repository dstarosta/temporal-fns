import { getDaysInYear as fn } from '../get-days-in-year.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getDaysInYear}.
 */
export const getDaysInYear: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
