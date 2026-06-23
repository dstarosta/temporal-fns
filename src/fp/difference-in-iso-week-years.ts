import { differenceInISOWeekYears as fn } from '../difference-in-iso-week-years.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link differenceInISOWeekYears}.
 */
export const differenceInISOWeekYears: FPFn2<number, Date, Date> = convertToFP(fn, 2) as FPFn2<
  number,
  Date,
  Date
>;
