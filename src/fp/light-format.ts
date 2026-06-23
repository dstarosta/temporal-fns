import { lightFormat as fn } from '../light-format.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link lightFormat}.
 */
export const lightFormat: FPFn2<string, string, Date | DateLike> = convertToFP(fn, 2) as FPFn2<
  string,
  string,
  Date | DateLike
>;
