import { FPFn3 } from "./types.js";

//#region src/fp/parse.d.ts
/**
 * Curried, data-last variant of {@link parse}. Does not accept `parse`'s options parameter; use
 * {@link parseWithOptions} for that. Only the plain `Date`-returning overload (no `options.in`) is
 * available here, matching date-fns' own `fp/parse` precedent of hardcoding the plain `Date`
 * signature rather than threading the `options.in`-discriminated return type through currying.
 */
declare const parse: FPFn3<Date, Date, string, string>;
//#endregion
export { parse };
//# sourceMappingURL=parse.d.ts.map