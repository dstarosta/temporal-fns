import { endOfHour as fn } from '../end-of-hour.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link endOfHour}.
 */
export const endOfHour: FPFn1<Date, Date> = convertToFP(fn, 1) as FPFn1<Date, Date>;
