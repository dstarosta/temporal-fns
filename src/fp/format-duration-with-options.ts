import {
  formatDuration as fn,
  type Duration,
  type FormatDurationOptions,
} from '../format-duration.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link formatDuration} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const formatDurationWithOptions: FPFn2<string, FormatDurationOptions | undefined, Duration> =
  convertToFP(fn, 2) as FPFn2<string, FormatDurationOptions | undefined, Duration>;
