import { isSameHour as fn } from '../is-same-hour.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link isSameHour}.
 */
export const isSameHour: FPFn2<boolean, Date, Date> = convertToFP(fn, 2) as FPFn2<
  boolean,
  Date,
  Date
>;
