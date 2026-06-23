import { FPFn2 } from "./types.js";
import { LocalWeekOptions } from "../helpers/local-week.js";

//#region src/fp/get-week-with-options.d.ts
/**
 * Curried, data-last variant of {@link getWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const getWeekWithOptions: FPFn2<number, LocalWeekOptions | undefined, Date>;
//#endregion
export { getWeekWithOptions };
//# sourceMappingURL=get-week-with-options.d.ts.map