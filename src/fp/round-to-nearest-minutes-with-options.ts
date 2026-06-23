import {
  roundToNearestMinutes as fn,
  type RoundToNearestMinutesOptions,
} from '../round-to-nearest-minutes.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link roundToNearestMinutes} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const roundToNearestMinutesWithOptions: FPFn2<
  Date,
  RoundToNearestMinutesOptions | undefined,
  Date
> = convertToFP(fn, 2) as FPFn2<Date, RoundToNearestMinutesOptions | undefined, Date>;
