import { FPFn3 } from "./types.js";
import { StartOfWeekOptions } from "../start-of-week.js";

//#region src/fp/set-day-with-options.d.ts
/**
 * Curried, data-last variant of {@link setDay} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const setDayWithOptions: FPFn3<Date, StartOfWeekOptions | undefined, number, Date>;
//#endregion
export { setDayWithOptions };
//# sourceMappingURL=set-day-with-options.d.ts.map