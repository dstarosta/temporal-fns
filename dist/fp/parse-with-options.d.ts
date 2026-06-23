import { FPFn4 } from "./types.js";
import { ParseOptions } from "../parse.js";

//#region src/fp/parse-with-options.d.ts
/**
 * Curried, data-last variant of {@link parse} that also accepts its options parameter (as the
 * first curried argument, i.e. the last positional argument). Only the plain `Date`-returning
 * overload (no `options.in`) is available here; see {@link parse} for why.
 */
declare const parseWithOptions: FPFn4<Date, ParseOptions | undefined, Date, string, string>;
//#endregion
export { parseWithOptions };
//# sourceMappingURL=parse-with-options.d.ts.map