import { differenceInSeconds as fn } from '../difference-in-seconds.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link differenceInSeconds}.
 */
export const differenceInSeconds: FPFn2<number, Date, Date> = convertToFP(fn, 2) as FPFn2<
  number,
  Date,
  Date
>;
