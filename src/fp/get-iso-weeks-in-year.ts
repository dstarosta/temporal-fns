import { getISOWeeksInYear as fn } from '../get-iso-weeks-in-year.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getISOWeeksInYear}.
 */
export const getISOWeeksInYear: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
