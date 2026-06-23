import { setYear as fn } from '../set-year.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link setYear}.
 */
export const setYear: FPFn2<Date, number, Date> = convertToFP(fn, 2) as FPFn2<Date, number, Date>;
