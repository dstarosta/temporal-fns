import { getDaysInMonth as fn } from '../get-days-in-month.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getDaysInMonth}.
 */
export const getDaysInMonth: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
