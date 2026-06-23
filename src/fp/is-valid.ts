import { isValid as fn } from '../is-valid.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link isValid}.
 */
export const isValid: FPFn1<boolean, unknown> = convertToFP(fn, 1) as FPFn1<boolean, unknown>;
