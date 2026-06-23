import { FPFn3 } from "./types.js";
import { FormatRelativeOptions } from "../format-relative.js";

//#region src/fp/format-relative-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatRelative} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatRelativeWithOptions: FPFn3<string, FormatRelativeOptions | undefined, Date, Date>;
//#endregion
export { formatRelativeWithOptions };
//# sourceMappingURL=format-relative-with-options.d.ts.map