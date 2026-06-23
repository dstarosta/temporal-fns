import { FPFn2 } from "./types.js";
import { StartOfWeekOptions } from "../start-of-week.js";

//#region src/fp/start-of-week-with-options.d.ts
/**
 * Curried, data-last variant of {@link startOfWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const startOfWeekWithOptions: FPFn2<Date, StartOfWeekOptions | undefined, Date>;
//#endregion
export { startOfWeekWithOptions };
//# sourceMappingURL=start-of-week-with-options.d.ts.map