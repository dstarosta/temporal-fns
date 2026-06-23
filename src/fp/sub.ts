import { sub as fn } from '../sub.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type Duration } from '../format-duration.js';

/**
 * Curried, data-last variant of {@link sub}.
 */
export const sub: FPFn2<Date, Duration, Date> = convertToFP(fn, 2) as FPFn2<Date, Duration, Date>;
