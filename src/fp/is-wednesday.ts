import { isWednesday as fn } from '../is-wednesday.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link isWednesday}.
 */
export const isWednesday: FPFn1<boolean, Date> = convertToFP(fn, 1) as FPFn1<boolean, Date>;
