import {
  roundToNearestHours as fn,
  type RoundToNearestHoursOptions,
} from '../round-to-nearest-hours.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link roundToNearestHours} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const roundToNearestHoursWithOptions: FPFn2<
  Date,
  RoundToNearestHoursOptions | undefined,
  Date
> = convertToFP(fn, 2) as FPFn2<Date, RoundToNearestHoursOptions | undefined, Date>;
