import { getQuarter as fn } from '../get-quarter.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getQuarter}.
 */
export const getQuarter: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
