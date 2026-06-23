import { FPFn1 } from "./types.js";

//#region src/fp/parse-iso.d.ts
/**
 * Curried, data-last variant of {@link parseISO}. Does not accept `parseISO`'s options parameter;
 * use {@link parseISOWithOptions} for that. Only the plain `Date`-returning overload (no
 * `options.in`) is available here, matching date-fns' own `fp/parseISO` precedent of hardcoding the
 * plain `Date` signature rather than threading the `options.in`-discriminated return type through
 * currying.
 *
 * There's only one argument to curry, so unlike the other `fp/` modules this isn't a curried
 * function at all — it's just `parseISO` itself, included for API parity with date-fns' `fp`.
 */
declare const parseISO: FPFn1<Date, string>;
//#endregion
export { parseISO };
//# sourceMappingURL=parse-iso.d.ts.map