import { subSeconds as fn } from '../sub-seconds.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link subSeconds}.
 */
export const subSeconds: FPFn2<Date, number, Date> = convertToFP(fn, 2) as FPFn2<
  Date,
  number,
  Date
>;
