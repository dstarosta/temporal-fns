import { toDate as fn } from '../to-date.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link toDate}.
 */
export const toDate: FPFn1<Date, unknown> = convertToFP(fn, 1) as FPFn1<Date, unknown>;
