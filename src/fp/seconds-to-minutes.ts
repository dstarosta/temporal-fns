import { secondsToMinutes as fn } from '../seconds-to-minutes.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link secondsToMinutes}.
 */
export const secondsToMinutes: FPFn1<number, number> = convertToFP(fn, 1) as FPFn1<number, number>;
