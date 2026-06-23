import { differenceInCalendarYears as fn } from '../difference-in-calendar-years.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link differenceInCalendarYears}.
 */
export const differenceInCalendarYears: FPFn2<number, Date, Date> = convertToFP(fn, 2) as FPFn2<
  number,
  Date,
  Date
>;
