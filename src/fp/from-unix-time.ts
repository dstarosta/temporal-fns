import { fromUnixTime as fn } from '../from-unix-time.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link fromUnixTime}.
 */
export const fromUnixTime: FPFn1<Date, number> = convertToFP(fn, 1) as FPFn1<Date, number>;
