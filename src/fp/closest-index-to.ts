import { closestIndexTo as fn } from '../closest-index-to.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link closestIndexTo}.
 */
export const closestIndexTo: FPFn2<number | undefined, readonly Date[], Date> = convertToFP(
  fn,
  2
) as FPFn2<number | undefined, readonly Date[], Date>;
