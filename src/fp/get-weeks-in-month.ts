import { getWeeksInMonth as fn } from '../get-weeks-in-month.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getWeeksInMonth}.
 */
export const getWeeksInMonth: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
