import { setWeek as fn } from '../set-week.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn3 } from './types.js';
import { type LocalWeekOptions } from '../helpers/local-week.js';

/**
 * Curried, data-last variant of {@link setWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const setWeekWithOptions: FPFn3<Date, LocalWeekOptions | undefined, number, Date> =
  convertToFP(fn, 3) as FPFn3<Date, LocalWeekOptions | undefined, number, Date>;
