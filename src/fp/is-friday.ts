import { isFriday as fn } from '../is-friday.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link isFriday}.
 */
export const isFriday: FPFn1<boolean, Date> = convertToFP(fn, 1) as FPFn1<boolean, Date>;
