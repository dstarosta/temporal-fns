import { startOfWeek as fn } from '../start-of-week.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link startOfWeek}.
 */
export const startOfWeek: FPFn1<Date, Date> = convertToFP(fn, 1) as FPFn1<Date, Date>;
