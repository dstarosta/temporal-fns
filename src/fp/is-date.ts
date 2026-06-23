import { isDate as fn } from '../is-date.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link isDate}.
 */
export const isDate: FPFn1<boolean, unknown> = convertToFP(fn, 1) as FPFn1<boolean, unknown>;
