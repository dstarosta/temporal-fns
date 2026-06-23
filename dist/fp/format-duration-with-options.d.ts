import { FPFn2 } from "./types.js";
import { Duration, FormatDurationOptions } from "../format-duration.js";

//#region src/fp/format-duration-with-options.d.ts
/**
 * Curried, data-last variant of {@link formatDuration} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const formatDurationWithOptions: FPFn2<string, FormatDurationOptions | undefined, Duration>;
//#endregion
export { formatDurationWithOptions };
//# sourceMappingURL=format-duration-with-options.d.ts.map