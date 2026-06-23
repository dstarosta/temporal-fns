import { differenceInCalendarISOWeekYears as fn } from '../difference-in-calendar-iso-week-years.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link differenceInCalendarISOWeekYears}.
 */
export const differenceInCalendarISOWeekYears: FPFn2<number, Date, Date> = convertToFP(
  fn,
  2
) as FPFn2<number, Date, Date>;
