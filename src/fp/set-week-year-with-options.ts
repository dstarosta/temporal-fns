import { setWeekYear as fn } from '../set-week-year.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn3 } from './types.js';
import { type LocalWeekOptions } from '../helpers/local-week.js';

/**
 * Curried, data-last variant of {@link setWeekYear} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const setWeekYearWithOptions: FPFn3<Date, LocalWeekOptions | undefined, number, Date> =
  convertToFP(fn, 3) as FPFn3<Date, LocalWeekOptions | undefined, number, Date>;
