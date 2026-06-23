import { yearsToQuarters as fn } from '../years-to-quarters.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link yearsToQuarters}.
 */
export const yearsToQuarters: FPFn1<number, number> = convertToFP(fn, 1) as FPFn1<number, number>;
