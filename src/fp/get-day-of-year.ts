import { getDayOfYear as fn } from '../get-day-of-year.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getDayOfYear}.
 */
export const getDayOfYear: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
