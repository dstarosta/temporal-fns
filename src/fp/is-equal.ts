import { isEqual as fn } from '../is-equal.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link isEqual}.
 */
export const isEqual: FPFn2<boolean, Date, Date> = convertToFP(fn, 2) as FPFn2<boolean, Date, Date>;
