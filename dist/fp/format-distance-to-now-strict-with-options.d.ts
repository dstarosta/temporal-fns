import { FPFn2 } from "./types.js";
import { DateLike } from "../types.js";
import { FormatDistanceStrictOptions } from "../format-distance-strict.js";

//#region src/fp/format-distance-to-now-strict-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatDistanceToNowStrict} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatDistanceToNowStrictWithOptions: FPFn2<string, FormatDistanceStrictOptions | undefined, Date | DateLike>;
//#endregion
export { formatDistanceToNowStrictWithOptions };
//# sourceMappingURL=format-distance-to-now-strict-with-options.d.ts.map