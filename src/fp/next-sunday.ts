import { nextSunday as fn } from '../next-sunday.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link nextSunday}.
 */
export const nextSunday: FPFn1<Date, Date> = convertToFP(fn, 1) as FPFn1<Date, Date>;
