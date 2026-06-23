import { FPFn3 } from "./types.js";
import { DateLike } from "../types.js";
import { IntlFormatLocaleOptions } from "../intl-format.js";

//#region src/fp/intl-format.d.ts
/**
 * Curried, data-last variant of {@link intlFormat}, curried at its highest arity (`date`,
 * `formatOptions`, `localeOptions`) — mirroring date-fns' own `fp/intlFormat`, which picks the same
 * arity for the same reason: `intlFormat`'s 1- and 2-argument overloads disagree on what the 2nd
 * positional argument means (`localeOptions` vs. `formatOptions`), so there's no single smaller
 * curry arity that covers every call shape. Pass `{}` for `formatOptions` to only set
 * `localeOptions`.
 */
declare const intlFormat: FPFn3<string, IntlFormatLocaleOptions | undefined, Intl.DateTimeFormatOptions | undefined, Date | DateLike>;
//#endregion
export { intlFormat };
//# sourceMappingURL=intl-format.d.ts.map