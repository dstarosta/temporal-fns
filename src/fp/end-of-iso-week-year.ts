import { endOfISOWeekYear as fn } from '../end-of-iso-week-year.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link endOfISOWeekYear}.
 */
export const endOfISOWeekYear: FPFn1<Date, Date> = convertToFP(fn, 1) as FPFn1<Date, Date>;
