import { FPFn2 } from "./types.js";
import { StartOfWeekOptions } from "../start-of-week.js";

//#region src/fp/end-of-week-with-options.d.ts
/**
 * Curried, data-last variant of {@link endOfWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const endOfWeekWithOptions: FPFn2<Date, StartOfWeekOptions | undefined, Date>;
//#endregion
export { endOfWeekWithOptions };
//# sourceMappingURL=end-of-week-with-options.d.ts.map