import { getWeekOfMonth as fn } from '../get-week-of-month.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type LocalWeekOptions } from '../helpers/local-week.js';

/**
 * Curried, data-last variant of {@link getWeekOfMonth} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const getWeekOfMonthWithOptions: FPFn2<number, LocalWeekOptions | undefined, Date> =
  convertToFP(fn, 2) as FPFn2<number, LocalWeekOptions | undefined, Date>;
