import { FPFn2 } from "./types.js";
import { LocalWeekOptions } from "../helpers/local-week.js";

//#region src/fp/get-weeks-in-month-with-options.d.ts
/**
 * Curried, data-last variant of {@link getWeeksInMonth} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const getWeeksInMonthWithOptions: FPFn2<number, LocalWeekOptions | undefined, Date>;
//#endregion
export { getWeeksInMonthWithOptions };
//# sourceMappingURL=get-weeks-in-month-with-options.d.ts.map