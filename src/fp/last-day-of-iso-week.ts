import { lastDayOfISOWeek as fn } from '../last-day-of-iso-week.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link lastDayOfISOWeek}.
 */
export const lastDayOfISOWeek: FPFn1<Date, Date> = convertToFP(fn, 1) as FPFn1<Date, Date>;
