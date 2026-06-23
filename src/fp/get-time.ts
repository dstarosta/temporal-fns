import { getTime as fn } from '../get-time.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getTime}.
 */
export const getTime: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
