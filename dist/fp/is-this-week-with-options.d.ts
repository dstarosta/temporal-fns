import { FPFn2 } from "./types.js";
import { DateLike } from "../types.js";
import { StartOfWeekOptions } from "../start-of-week.js";

//#region src/fp/is-this-week-with-options.d.ts
/**
 * Curried, data-last variant of {@link isThisWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const isThisWeekWithOptions: FPFn2<boolean, StartOfWeekOptions | undefined, Date | DateLike>;
//#endregion
export { isThisWeekWithOptions };
//# sourceMappingURL=is-this-week-with-options.d.ts.map