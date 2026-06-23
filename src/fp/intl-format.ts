import { intlFormat as fn, type IntlFormatLocaleOptions } from '../intl-format.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn3 } from './types.js';
import { type DateLike } from '../types.js';

/**
 * Curried, data-last variant of {@link intlFormat}, curried at its highest arity (`date`,
 * `formatOptions`, `localeOptions`) — mirroring date-fns' own `fp/intlFormat`, which picks the same
 * arity for the same reason: `intlFormat`'s 1- and 2-argument overloads disagree on what the 2nd
 * positional argument means (`localeOptions` vs. `formatOptions`), so there's no single smaller
 * curry arity that covers every call shape. Pass `{}` for `formatOptions` to only set
 * `localeOptions`.
 */
export const intlFormat: FPFn3<
  string,
  IntlFormatLocaleOptions | undefined,
  Intl.DateTimeFormatOptions | undefined,
  Date | DateLike
> = convertToFP(
  (
    date: Date | DateLike,
    formatOptions: Intl.DateTimeFormatOptions = {},
    localeOptions?: IntlFormatLocaleOptions
  ) => (localeOptions ? fn(date, formatOptions, localeOptions) : fn(date, formatOptions)),
  3
) as FPFn3<
  string,
  IntlFormatLocaleOptions | undefined,
  Intl.DateTimeFormatOptions | undefined,
  Date | DateLike
>;
