import { isSameMinute as fn } from '../is-same-minute.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link isSameMinute}.
 */
export const isSameMinute: FPFn2<boolean, Date, Date> = convertToFP(fn, 2) as FPFn2<
  boolean,
  Date,
  Date
>;
