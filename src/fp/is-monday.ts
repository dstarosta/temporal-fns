import { isMonday as fn } from '../is-monday.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link isMonday}.
 */
export const isMonday: FPFn1<boolean, Date> = convertToFP(fn, 1) as FPFn1<boolean, Date>;
