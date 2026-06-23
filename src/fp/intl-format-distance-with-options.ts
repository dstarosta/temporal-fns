import {
  intlFormatDistance as fn,
  type IntlFormatDistanceOptions,
} from '../intl-format-distance.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn3 } from './types.js';

/**
 * Curried, data-last variant of {@link intlFormatDistance} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
export const intlFormatDistanceWithOptions: FPFn3<
  string,
  IntlFormatDistanceOptions | undefined,
  Date,
  Date
> = convertToFP(fn, 3) as FPFn3<string, IntlFormatDistanceOptions | undefined, Date, Date>;
