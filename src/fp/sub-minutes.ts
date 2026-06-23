import { subMinutes as fn } from '../sub-minutes.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link subMinutes}.
 */
export const subMinutes: FPFn2<Date, number, Date> = convertToFP(fn, 2) as FPFn2<
  Date,
  number,
  Date
>;
