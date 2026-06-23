import { millisecondsToSeconds as fn } from '../milliseconds-to-seconds.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link millisecondsToSeconds}.
 */
export const millisecondsToSeconds: FPFn1<number, number> = convertToFP(fn, 1) as FPFn1<
  number,
  number
>;
