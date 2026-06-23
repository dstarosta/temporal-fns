import { startOfWeekYear as fn } from '../start-of-week-year.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type LocalWeekOptions } from '../helpers/local-week.js';

/**
 * Curried, data-last variant of {@link startOfWeekYear} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const startOfWeekYearWithOptions: FPFn2<Date, LocalWeekOptions | undefined, Date> =
  convertToFP(fn, 2) as FPFn2<Date, LocalWeekOptions | undefined, Date>;
