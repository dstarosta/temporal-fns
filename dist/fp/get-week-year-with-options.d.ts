import { FPFn2 } from "./types.js";
import { LocalWeekOptions } from "../helpers/local-week.js";

//#region src/fp/get-week-year-with-options.d.ts
/**
 * Curried, data-last variant of {@link getWeekYear} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const getWeekYearWithOptions: FPFn2<number, LocalWeekOptions | undefined, Date>;
//#endregion
export { getWeekYearWithOptions };
//# sourceMappingURL=get-week-year-with-options.d.ts.map