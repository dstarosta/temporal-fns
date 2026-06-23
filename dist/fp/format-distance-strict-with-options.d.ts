import { FPFn3 } from "./types.js";
import { FormatDistanceStrictOptions } from "../format-distance-strict.js";

//#region src/fp/format-distance-strict-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatDistanceStrict} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatDistanceStrictWithOptions: FPFn3<string, FormatDistanceStrictOptions | undefined, Date, Date>;
//#endregion
export { formatDistanceStrictWithOptions };
//# sourceMappingURL=format-distance-strict-with-options.d.ts.map