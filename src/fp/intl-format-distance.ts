import { intlFormatDistance as fn } from '../intl-format-distance.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link intlFormatDistance}.
 */
export const intlFormatDistance: FPFn2<string, Date, Date> = convertToFP(fn, 2) as FPFn2<
  string,
  Date,
  Date
>;
