import { getSeconds as fn } from '../get-seconds.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getSeconds}.
 */
export const getSeconds: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
