import { isThisSecond as fn } from '../is-this-second.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';
import { type TimeLike } from '../types.js';

/**
 * Curried, data-last variant of {@link isThisSecond}.
 */
export const isThisSecond: FPFn1<boolean, Date | TimeLike> = convertToFP(fn, 1) as FPFn1<
  boolean,
  Date | TimeLike
>;
