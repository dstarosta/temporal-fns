import { minutesToMilliseconds as fn } from '../minutes-to-milliseconds.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link minutesToMilliseconds}.
 */
export const minutesToMilliseconds: FPFn1<number, number> = convertToFP(fn, 1) as FPFn1<
  number,
  number
>;
