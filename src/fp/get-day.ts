import { getDay as fn } from '../get-day.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getDay}.
 */
export const getDay: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
