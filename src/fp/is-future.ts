import { isFuture as fn } from '../is-future.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link isFuture}.
 */
export const isFuture: FPFn1<boolean, Date | DateLike> = convertToFP(fn, 1) as FPFn1<
  boolean,
  Date | DateLike
>;
