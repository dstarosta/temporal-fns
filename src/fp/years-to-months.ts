import { yearsToMonths as fn } from '../years-to-months.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link yearsToMonths}.
 */
export const yearsToMonths: FPFn1<number, number> = convertToFP(fn, 1) as FPFn1<number, number>;
