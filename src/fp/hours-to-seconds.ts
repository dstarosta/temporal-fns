import { hoursToSeconds as fn } from '../hours-to-seconds.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link hoursToSeconds}.
 */
export const hoursToSeconds: FPFn1<number, number> = convertToFP(fn, 1) as FPFn1<number, number>;
