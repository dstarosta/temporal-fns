import { FPFn2 } from "./types.js";
import { DateLike } from "../types.js";
import { FormatISOOptions } from "../format-iso.js";

//#region src/fp/format-iso-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatISO} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatISOWithOptions: FPFn2<string, FormatISOOptions | undefined, Date | DateLike>;
//#endregion
export { formatISOWithOptions };
//# sourceMappingURL=format-iso-with-options.d.ts.map