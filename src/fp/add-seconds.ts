import { addSeconds as fn } from '../add-seconds.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link addSeconds}.
 */
export const addSeconds: FPFn2<Date, number, Date> = convertToFP(fn, 2) as FPFn2<
  Date,
  number,
  Date
>;
