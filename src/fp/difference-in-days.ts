import { differenceInDays as fn } from '../difference-in-days.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link differenceInDays}.
 */
export const differenceInDays: FPFn2<number, Date, Date> = convertToFP(fn, 2) as FPFn2<
  number,
  Date,
  Date
>;
