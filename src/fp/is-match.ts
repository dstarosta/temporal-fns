import { isMatch as fn } from '../is-match.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link isMatch}.
 */
export const isMatch: FPFn2<boolean, string, string> = convertToFP(fn, 2) as FPFn2<
  boolean,
  string,
  string
>;
