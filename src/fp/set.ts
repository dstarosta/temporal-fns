import { set as fn, type DateValues } from '../set.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link set}.
 */
export const set: FPFn2<Date, DateValues, Date> = convertToFP(fn, 2) as FPFn2<
  Date,
  DateValues,
  Date
>;
