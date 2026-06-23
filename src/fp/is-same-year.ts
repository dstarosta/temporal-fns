import { isSameYear as fn } from '../is-same-year.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link isSameYear}.
 */
export const isSameYear: FPFn2<boolean, Date, Date> = convertToFP(fn, 2) as FPFn2<
  boolean,
  Date,
  Date
>;
