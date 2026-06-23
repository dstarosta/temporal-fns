import { getWeekOfMonth as fn } from '../get-week-of-month.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getWeekOfMonth}.
 */
export const getWeekOfMonth: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
