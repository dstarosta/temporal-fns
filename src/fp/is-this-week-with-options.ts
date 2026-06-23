import { isThisWeek as fn } from '../is-this-week.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type DateLike } from '../types.js';
import { type StartOfWeekOptions } from '../start-of-week.js';

/**
 * Curried, data-last variant of {@link isThisWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const isThisWeekWithOptions: FPFn2<
  boolean,
  StartOfWeekOptions | undefined,
  Date | DateLike
> = convertToFP(fn, 2) as FPFn2<boolean, StartOfWeekOptions | undefined, Date | DateLike>;
