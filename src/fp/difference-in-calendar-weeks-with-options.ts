import { differenceInCalendarWeeks as fn } from '../difference-in-calendar-weeks.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn3 } from './types.js';
import { type StartOfWeekOptions } from '../start-of-week.js';

/**
 * Curried, data-last variant of {@link differenceInCalendarWeeks} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const differenceInCalendarWeeksWithOptions: FPFn3<
  number,
  StartOfWeekOptions | undefined,
  Date,
  Date
> = convertToFP(fn, 3) as FPFn3<number, StartOfWeekOptions | undefined, Date, Date>;
