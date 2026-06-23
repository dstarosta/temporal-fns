import { isTuesday as fn } from '../is-tuesday.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link isTuesday}.
 */
export const isTuesday: FPFn1<boolean, Date> = convertToFP(fn, 1) as FPFn1<boolean, Date>;
