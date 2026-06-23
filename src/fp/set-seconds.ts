import { setSeconds as fn } from '../set-seconds.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link setSeconds}.
 */
export const setSeconds: FPFn2<Date, number, Date> = convertToFP(fn, 2) as FPFn2<
  Date,
  number,
  Date
>;
