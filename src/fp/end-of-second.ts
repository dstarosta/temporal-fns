import { endOfSecond as fn } from '../end-of-second.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link endOfSecond}.
 */
export const endOfSecond: FPFn1<Date, Date> = convertToFP(fn, 1) as FPFn1<Date, Date>;
