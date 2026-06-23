import { previousTuesday as fn } from '../previous-tuesday.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link previousTuesday}.
 */
export const previousTuesday: FPFn1<Date, Date> = convertToFP(fn, 1) as FPFn1<Date, Date>;
