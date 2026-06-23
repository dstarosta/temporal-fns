import { toPlainDate as fn } from '../to-plain-date.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link toPlainDate}.
 */
export const toPlainDate: FPFn1<Temporal.PlainDate, Date | DateLike> = convertToFP(fn, 1) as FPFn1<
  Temporal.PlainDate,
  Date | DateLike
>;
