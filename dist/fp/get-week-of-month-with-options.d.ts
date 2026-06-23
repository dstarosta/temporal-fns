import { FPFn2 } from "./types.js";
import { LocalWeekOptions } from "../helpers/local-week.js";

//#region src/fp/get-week-of-month-with-options.d.ts
/**
 * Curried, data-last variant of {@link getWeekOfMonth} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const getWeekOfMonthWithOptions: FPFn2<number, LocalWeekOptions | undefined, Date>;
//#endregion
export { getWeekOfMonthWithOptions };
//# sourceMappingURL=get-week-of-month-with-options.d.ts.map