import { millisecondsToMinutes as fn } from '../milliseconds-to-minutes.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link millisecondsToMinutes}.
 */
export const millisecondsToMinutes: FPFn1<number, number> = convertToFP(fn, 1) as FPFn1<
  number,
  number
>;
