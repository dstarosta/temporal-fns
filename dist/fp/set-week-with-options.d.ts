import { FPFn3 } from "./types.js";
import { LocalWeekOptions } from "../helpers/local-week.js";

//#region src/fp/set-week-with-options.d.ts
/**
 * Curried, data-last variant of {@link setWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const setWeekWithOptions: FPFn3<Date, LocalWeekOptions | undefined, number, Date>;
//#endregion
export { setWeekWithOptions };
//# sourceMappingURL=set-week-with-options.d.ts.map