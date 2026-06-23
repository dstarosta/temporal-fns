import { isAfter as fn } from '../is-after.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link isAfter}.
 */
export const isAfter: FPFn2<boolean, Date, Date> = convertToFP(fn, 2) as FPFn2<boolean, Date, Date>;
