import { getISOWeek as fn } from '../get-iso-week.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getISOWeek}.
 */
export const getISOWeek: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
