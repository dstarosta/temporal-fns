import { FPFn2 } from "./types.js";
import { DateLike } from "../types.js";
import { FormatDistanceOptions } from "../format-distance.js";

//#region src/fp/format-distance-to-now-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatDistanceToNow} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatDistanceToNowWithOptions: FPFn2<string, FormatDistanceOptions | undefined, Date | DateLike>;
//#endregion
export { formatDistanceToNowWithOptions };
//# sourceMappingURL=format-distance-to-now-with-options.d.ts.map