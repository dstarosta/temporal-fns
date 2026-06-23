import { constructNow as fn } from '../construct-now.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link constructNow}.
 */
export const constructNow: FPFn1<Date, Date> = convertToFP(fn, 1) as FPFn1<Date, Date>;
