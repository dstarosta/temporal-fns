import { previousThursday as fn } from '../previous-thursday.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link previousThursday}.
 */
export const previousThursday: FPFn1<Date, Date> = convertToFP(fn, 1) as FPFn1<Date, Date>;
