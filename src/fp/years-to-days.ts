import { yearsToDays as fn } from '../years-to-days.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link yearsToDays}.
 */
export const yearsToDays: FPFn1<number, number> = convertToFP(fn, 1) as FPFn1<number, number>;
