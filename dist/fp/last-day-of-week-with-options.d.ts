import { FPFn2 } from "./types.js";
import { StartOfWeekOptions } from "../start-of-week.js";

//#region src/fp/last-day-of-week-with-options.d.ts
/**
 * Curried, data-last variant of {@link lastDayOfWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const lastDayOfWeekWithOptions: FPFn2<Date, StartOfWeekOptions | undefined, Date>;
//#endregion
export { lastDayOfWeekWithOptions };
//# sourceMappingURL=last-day-of-week-with-options.d.ts.map