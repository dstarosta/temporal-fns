import { hoursToMilliseconds as fn } from '../hours-to-milliseconds.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link hoursToMilliseconds}.
 */
export const hoursToMilliseconds: FPFn1<number, number> = convertToFP(fn, 1) as FPFn1<
  number,
  number
>;
