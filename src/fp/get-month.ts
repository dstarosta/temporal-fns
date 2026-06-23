import { getMonth as fn } from '../get-month.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getMonth}.
 */
export const getMonth: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
