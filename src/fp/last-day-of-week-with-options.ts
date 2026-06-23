import { lastDayOfWeek as fn } from '../last-day-of-week.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type StartOfWeekOptions } from '../start-of-week.js';

/**
 * Curried, data-last variant of {@link lastDayOfWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const lastDayOfWeekWithOptions: FPFn2<Date, StartOfWeekOptions | undefined, Date> =
  convertToFP(fn, 2) as FPFn2<Date, StartOfWeekOptions | undefined, Date>;
