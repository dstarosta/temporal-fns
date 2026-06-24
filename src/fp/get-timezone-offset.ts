import { getTimezoneOffset as fn } from '../get-timezone-offset.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link getTimezoneOffset}.
 */
export const getTimezoneOffset: FPFn2<number, Date | DateLike | undefined, string> = convertToFP(
  fn,
  2
) as FPFn2<number, Date | DateLike | undefined, string>;
