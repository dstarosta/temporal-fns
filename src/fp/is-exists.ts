import { isExists as fn } from '../is-exists.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn3 } from './types.js';

/**
 * Curried, data-last variant of {@link isExists}.
 */
export const isExists: FPFn3<boolean, number, number, number> = convertToFP(fn, 3) as FPFn3<
  boolean,
  number,
  number,
  number
>;
