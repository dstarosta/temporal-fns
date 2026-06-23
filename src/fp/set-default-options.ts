import { setDefaultOptions as fn } from '../set-default-options.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';
import { type SetDefaultOptions } from '../helpers/default-options.js';

/**
 * Curried, data-last variant of {@link setDefaultOptions}.
 */
export const setDefaultOptions: FPFn1<void, SetDefaultOptions> = convertToFP(fn, 1) as FPFn1<
  void,
  SetDefaultOptions
>;
