import { startOfMonth as fn } from '../start-of-month.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link startOfMonth}.
 */
export const startOfMonth: FPFn1<Date, Date> = convertToFP(fn, 1) as FPFn1<Date, Date>;
