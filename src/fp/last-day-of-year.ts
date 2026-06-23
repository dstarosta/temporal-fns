import { lastDayOfYear as fn } from '../last-day-of-year.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link lastDayOfYear}.
 */
export const lastDayOfYear: FPFn1<Date, Date> = convertToFP(fn, 1) as FPFn1<Date, Date>;
