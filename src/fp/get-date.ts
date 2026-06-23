import { getDate as fn } from '../get-date.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getDate}.
 */
export const getDate: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
