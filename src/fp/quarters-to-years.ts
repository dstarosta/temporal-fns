import { quartersToYears as fn } from '../quarters-to-years.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link quartersToYears}.
 */
export const quartersToYears: FPFn1<number, number> = convertToFP(fn, 1) as FPFn1<number, number>;
