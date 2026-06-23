import { FPFn2 } from "./types.js";
import { ParseISOOptions } from "../parse-iso.js";

//#region src/fp/parse-iso-with-options.d.ts
/**
 * Curried, data-last variant of {@link parseISO} that also accepts its options parameter (as the
 * first curried argument, i.e. the last positional argument). Only the plain `Date`-returning
 * overload (no `options.in`) is available here; see {@link parseISO} for why.
 */
declare const parseISOWithOptions: FPFn2<Date, ParseISOOptions | undefined, string>;
//#endregion
export { parseISOWithOptions };
//# sourceMappingURL=parse-iso-with-options.d.ts.map