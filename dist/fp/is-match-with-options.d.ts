import { FPFn3 } from "./types.js";
import { ParseOptions } from "../parse.js";

//#region src/fp/is-match-with-options.d.ts
/**
 * Curried, data-last variant of {@link isMatch} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const isMatchWithOptions: FPFn3<boolean, ParseOptions | undefined, string, string>;
//#endregion
export { isMatchWithOptions };
//# sourceMappingURL=is-match-with-options.d.ts.map