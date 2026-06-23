import { isSameWeek as fn } from '../is-same-week.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn3 } from './types.js';
import { type StartOfWeekOptions } from '../start-of-week.js';

/**
 * Curried, data-last variant of {@link isSameWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const isSameWeekWithOptions: FPFn3<boolean, StartOfWeekOptions | undefined, Date, Date> =
  convertToFP(fn, 3) as FPFn3<boolean, StartOfWeekOptions | undefined, Date, Date>;
