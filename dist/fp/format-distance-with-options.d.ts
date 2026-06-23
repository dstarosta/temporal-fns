import { FPFn3 } from "./types.js";
import { FormatDistanceOptions } from "../format-distance.js";

//#region src/fp/format-distance-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatDistance} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatDistanceWithOptions: FPFn3<string, FormatDistanceOptions | undefined, Date, Date>;
//#endregion
export { formatDistanceWithOptions };
//# sourceMappingURL=format-distance-with-options.d.ts.map