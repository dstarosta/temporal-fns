import { differenceInCalendarQuarters as fn } from '../difference-in-calendar-quarters.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link differenceInCalendarQuarters}.
 */
export const differenceInCalendarQuarters: FPFn2<number, Date, Date> = convertToFP(fn, 2) as FPFn2<
  number,
  Date,
  Date
>;
