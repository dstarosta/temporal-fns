import { closestTo as fn } from '../closest-to.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link closestTo}.
 */
export const closestTo: FPFn2<Date | undefined, readonly Date[], Date> = convertToFP(
  fn,
  2
) as FPFn2<Date | undefined, readonly Date[], Date>;
