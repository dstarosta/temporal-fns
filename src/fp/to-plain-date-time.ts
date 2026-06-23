import { toPlainDateTime as fn } from '../to-plain-date-time.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link toPlainDateTime}.
 */
export const toPlainDateTime: FPFn1<Temporal.PlainDateTime, Date | DateLike> = convertToFP(
  fn,
  1
) as FPFn1<Temporal.PlainDateTime, Date | DateLike>;
