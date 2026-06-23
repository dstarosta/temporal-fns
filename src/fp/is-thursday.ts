import { isThursday as fn } from '../is-thursday.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link isThursday}.
 */
export const isThursday: FPFn1<boolean, Date> = convertToFP(fn, 1) as FPFn1<boolean, Date>;
