import { quartersToMonths as fn } from '../quarters-to-months.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link quartersToMonths}.
 */
export const quartersToMonths: FPFn1<number, number> = convertToFP(fn, 1) as FPFn1<number, number>;
