import { getMinutes as fn } from '../get-minutes.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getMinutes}.
 */
export const getMinutes: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
