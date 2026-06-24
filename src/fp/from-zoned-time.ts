import { fromZonedTime as fn } from '../from-zoned-time.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link fromZonedTime}.
 */
export const fromZonedTime: FPFn2<Date, string, Date | DateLike> = convertToFP(fn, 2) as FPFn2<
  Date,
  string,
  Date | DateLike
>;
