import { endOfWeek as fn } from '../end-of-week.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type StartOfWeekOptions } from '../start-of-week.js';

/**
 * Curried, data-last variant of {@link endOfWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const endOfWeekWithOptions: FPFn2<Date, StartOfWeekOptions | undefined, Date> = convertToFP(
  fn,
  2
) as FPFn2<Date, StartOfWeekOptions | undefined, Date>;
