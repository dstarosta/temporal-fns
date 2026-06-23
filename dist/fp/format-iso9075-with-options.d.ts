import { FPFn2 } from "./types.js";
import { DateLike } from "../types.js";
import { FormatISO9075Options } from "../format-iso9075.js";

//#region src/fp/format-iso9075-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatISO9075} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatISO9075WithOptions: FPFn2<string, FormatISO9075Options | undefined, Date | DateLike>;
//#endregion
export { formatISO9075WithOptions };
//# sourceMappingURL=format-iso9075-with-options.d.ts.map