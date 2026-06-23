import { isYesterday as fn } from '../is-yesterday.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link isYesterday}.
 */
export const isYesterday: FPFn1<boolean, Date | DateLike> = convertToFP(fn, 1) as FPFn1<
  boolean,
  Date | DateLike
>;
