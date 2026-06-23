import { isMatch as fn } from '../is-match.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn3 } from './types.js';
import { type ParseOptions } from '../parse.js';

/**
 * Curried, data-last variant of {@link isMatch} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const isMatchWithOptions: FPFn3<boolean, ParseOptions | undefined, string, string> =
  convertToFP(fn, 3) as FPFn3<boolean, ParseOptions | undefined, string, string>;
