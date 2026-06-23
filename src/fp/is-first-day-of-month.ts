import { isFirstDayOfMonth as fn } from '../is-first-day-of-month.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link isFirstDayOfMonth}.
 */
export const isFirstDayOfMonth: FPFn1<boolean, Date> = convertToFP(fn, 1) as FPFn1<boolean, Date>;
