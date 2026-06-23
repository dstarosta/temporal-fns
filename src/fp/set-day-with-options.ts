import { setDay as fn } from '../set-day.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn3 } from './types.js';
import { type StartOfWeekOptions } from '../start-of-week.js';

/**
 * Curried, data-last variant of {@link setDay} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const setDayWithOptions: FPFn3<Date, StartOfWeekOptions | undefined, number, Date> =
  convertToFP(fn, 3) as FPFn3<Date, StartOfWeekOptions | undefined, number, Date>;
