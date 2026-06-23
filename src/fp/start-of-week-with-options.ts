import { startOfWeek as fn, type StartOfWeekOptions } from '../start-of-week.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link startOfWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const startOfWeekWithOptions: FPFn2<Date, StartOfWeekOptions | undefined, Date> =
  convertToFP(fn, 2) as FPFn2<Date, StartOfWeekOptions | undefined, Date>;
