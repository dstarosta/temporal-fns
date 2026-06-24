import { FPFn4 } from "./types.js";
import { DateLike } from "../types.js";
import { FormatOptions } from "../format.js";

//#region src/fp/format-in-time-zone-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatInTimeZone} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatInTimeZoneWithOptions: FPFn4<string, FormatOptions | undefined, string, string, Date | DateLike>;
//#endregion
export { formatInTimeZoneWithOptions };
//# sourceMappingURL=format-in-time-zone-with-options.d.ts.map