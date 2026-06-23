import { isThisMinute as fn } from '../is-this-minute.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';
import { type TimeLike } from '../types.js';

/**
 * Curried, data-last variant of {@link isThisMinute}.
 */
export const isThisMinute: FPFn1<boolean, Date | TimeLike> = convertToFP(fn, 1) as FPFn1<
  boolean,
  Date | TimeLike
>;
