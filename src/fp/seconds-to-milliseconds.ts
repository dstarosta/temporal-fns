import { secondsToMilliseconds as fn } from '../seconds-to-milliseconds.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link secondsToMilliseconds}.
 */
export const secondsToMilliseconds: FPFn1<number, number> = convertToFP(fn, 1) as FPFn1<
  number,
  number
>;
