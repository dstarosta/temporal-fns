import { getWeek as fn } from '../get-week.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type LocalWeekOptions } from '../helpers/local-week.js';

/**
 * Curried, data-last variant of {@link getWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const getWeekWithOptions: FPFn2<number, LocalWeekOptions | undefined, Date> = convertToFP(
  fn,
  2
) as FPFn2<number, LocalWeekOptions | undefined, Date>;
