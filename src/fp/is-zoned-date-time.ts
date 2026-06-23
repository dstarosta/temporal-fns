import { isZonedDateTime as fn } from '../is-zoned-date-time.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link isZonedDateTime}.
 */
export const isZonedDateTime: FPFn1<boolean, unknown> = convertToFP(fn, 1) as FPFn1<
  boolean,
  unknown
>;
