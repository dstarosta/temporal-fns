import { fromUnixTimePlainDateTime as fn } from '../from-unix-time-plain-date-time.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link fromUnixTimePlainDateTime}.
 */
export const fromUnixTimePlainDateTime: FPFn1<Temporal.PlainDateTime, number> = convertToFP(
  fn,
  1
) as FPFn1<Temporal.PlainDateTime, number>;
