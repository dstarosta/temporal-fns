import { add as fn } from '../add.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type Duration } from '../format-duration.js';

/**
 * Curried, data-last variant of {@link add}.
 */
export const add: FPFn2<Date, Duration, Date> = convertToFP(fn, 2) as FPFn2<Date, Duration, Date>;
