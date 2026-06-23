import { isLeapYear as fn } from '../is-leap-year.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link isLeapYear}.
 */
export const isLeapYear: FPFn1<boolean, Date> = convertToFP(fn, 1) as FPFn1<boolean, Date>;
