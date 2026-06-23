import { milliseconds as fn } from '../milliseconds.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';
import { type Duration } from '../format-duration.js';

/**
 * Curried, data-last variant of {@link milliseconds}.
 */
export const milliseconds: FPFn1<number, Duration> = convertToFP(fn, 1) as FPFn1<number, Duration>;
