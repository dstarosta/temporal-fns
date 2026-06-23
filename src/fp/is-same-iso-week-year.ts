import { isSameISOWeekYear as fn } from '../is-same-iso-week-year.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link isSameISOWeekYear}.
 */
export const isSameISOWeekYear: FPFn2<boolean, Date, Date> = convertToFP(fn, 2) as FPFn2<
  boolean,
  Date,
  Date
>;
