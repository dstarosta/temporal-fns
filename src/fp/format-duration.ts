import { formatDuration as fn, type Duration } from '../format-duration.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link formatDuration}.
 */
export const formatDuration: FPFn1<string, Duration> = convertToFP(fn, 1) as FPFn1<
  string,
  Duration
>;
