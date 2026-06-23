import { differenceInMinutes as fn } from '../difference-in-minutes.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link differenceInMinutes}.
 */
export const differenceInMinutes: FPFn2<number, Date, Date> = convertToFP(fn, 2) as FPFn2<
  number,
  Date,
  Date
>;
