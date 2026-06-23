import { previousFriday as fn } from '../previous-friday.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link previousFriday}.
 */
export const previousFriday: FPFn1<Date, Date> = convertToFP(fn, 1) as FPFn1<Date, Date>;
