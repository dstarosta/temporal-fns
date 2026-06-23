import { getDecade as fn } from '../get-decade.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getDecade}.
 */
export const getDecade: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
