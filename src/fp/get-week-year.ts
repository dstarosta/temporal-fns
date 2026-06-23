import { getWeekYear as fn } from '../get-week-year.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getWeekYear}.
 */
export const getWeekYear: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
