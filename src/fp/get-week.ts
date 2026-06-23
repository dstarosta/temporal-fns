import { getWeek as fn } from '../get-week.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getWeek}.
 */
export const getWeek: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
