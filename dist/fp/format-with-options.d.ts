import { FPFn3 } from "./types.js";
import { DateLike } from "../types.js";
import { FormatOptions } from "../format.js";

//#region src/fp/format-with-options.d.ts
/**
 * Curried, data-last variant of {@link format} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatWithOptions: FPFn3<string, FormatOptions | undefined, string, Date | DateLike>;
//#endregion
export { formatWithOptions };
//# sourceMappingURL=format-with-options.d.ts.map