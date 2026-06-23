import { weeksToDays as fn } from '../weeks-to-days.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link weeksToDays}.
 */
export const weeksToDays: FPFn1<number, number> = convertToFP(fn, 1) as FPFn1<number, number>;
