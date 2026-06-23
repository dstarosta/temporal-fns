import { startOfSecond as fn } from '../start-of-second.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link startOfSecond}.
 */
export const startOfSecond: FPFn1<Date, Date> = convertToFP(fn, 1) as FPFn1<Date, Date>;
