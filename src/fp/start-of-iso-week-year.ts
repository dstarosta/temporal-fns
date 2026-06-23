import { startOfISOWeekYear as fn } from '../start-of-iso-week-year.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link startOfISOWeekYear}.
 */
export const startOfISOWeekYear: FPFn1<Date, Date> = convertToFP(fn, 1) as FPFn1<Date, Date>;
