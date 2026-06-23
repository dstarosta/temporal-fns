import { isLastDayOfMonth as fn } from '../is-last-day-of-month.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link isLastDayOfMonth}.
 */
export const isLastDayOfMonth: FPFn1<boolean, Date> = convertToFP(fn, 1) as FPFn1<boolean, Date>;
