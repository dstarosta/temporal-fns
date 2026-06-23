import { isWeekend as fn } from '../is-weekend.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link isWeekend}.
 */
export const isWeekend: FPFn1<boolean, Date> = convertToFP(fn, 1) as FPFn1<boolean, Date>;
