import { parse as fn, type ParseOptions } from '../parse.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn3 } from './types.js';

/**
 * Curried, data-last variant of {@link parse}. Does not accept `parse`'s options parameter; use
 * {@link parseWithOptions} for that. Only the plain `Date`-returning overload (no `options.in`) is
 * available here, matching date-fns' own `fp/parse` precedent of hardcoding the plain `Date`
 * signature rather than threading the `options.in`-discriminated return type through currying.
 */
export const parse: FPFn3<Date, Date, string, string> = convertToFP(
  (dateStr: string, formatStr: string, referenceDate: Date, options?: ParseOptions) =>
    fn(dateStr, formatStr, referenceDate, options),
  3
) as FPFn3<Date, Date, string, string>;
