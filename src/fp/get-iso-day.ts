import { getISODay as fn } from '../get-iso-day.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getISODay}.
 */
export const getISODay: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
