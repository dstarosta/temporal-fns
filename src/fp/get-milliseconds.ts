import { getMilliseconds as fn } from '../get-milliseconds.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getMilliseconds}.
 */
export const getMilliseconds: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
