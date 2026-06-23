import { FPFn2 } from "./types.js";
import { LocalWeekOptions } from "../helpers/local-week.js";

//#region src/fp/start-of-week-year-with-options.d.ts
/**
 * Curried, data-last variant of {@link startOfWeekYear} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const startOfWeekYearWithOptions: FPFn2<Date, LocalWeekOptions | undefined, Date>;
//#endregion
export { startOfWeekYearWithOptions };
//# sourceMappingURL=start-of-week-year-with-options.d.ts.map