import { nextWednesday as fn } from '../next-wednesday.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link nextWednesday}.
 */
export const nextWednesday: FPFn1<Date, Date> = convertToFP(fn, 1) as FPFn1<Date, Date>;
