import { parse as fn, type ParseOptions } from '../parse.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn4 } from './types.js';

/**
 * Curried, data-last variant of {@link parse} that also accepts its options parameter (as the
 * first curried argument, i.e. the last positional argument). Only the plain `Date`-returning
 * overload (no `options.in`) is available here; see {@link parse} for why.
 */
export const parseWithOptions: FPFn4<Date, ParseOptions | undefined, Date, string, string> =
  convertToFP(
    (dateStr: string, formatStr: string, referenceDate: Date, options?: ParseOptions) =>
      fn(dateStr, formatStr, referenceDate, options),
    4
  ) as FPFn4<Date, ParseOptions | undefined, Date, string, string>;
