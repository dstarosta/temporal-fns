import { startOfWeekYear as fn } from '../start-of-week-year.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link startOfWeekYear}.
 */
export const startOfWeekYear: FPFn1<Date, Date> = convertToFP(fn, 1) as FPFn1<Date, Date>;
