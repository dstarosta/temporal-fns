import { FPFn2 } from "./types.js";
import { DateLike } from "../types.js";
import { FormatRFC3339Options } from "../format-rfc3339.js";

//#region src/fp/format-rfc3339-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatRFC3339} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatRFC3339WithOptions: FPFn2<string, FormatRFC3339Options | undefined, Date | DateLike>;
//#endregion
export { formatRFC3339WithOptions };
//# sourceMappingURL=format-rfc3339-with-options.d.ts.map