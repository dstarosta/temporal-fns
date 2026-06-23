import { subISOWeekYears as fn } from '../sub-iso-week-years.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link subISOWeekYears}.
 */
export const subISOWeekYears: FPFn2<Date, number, Date> = convertToFP(fn, 2) as FPFn2<
  Date,
  number,
  Date
>;
