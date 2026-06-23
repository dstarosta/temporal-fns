import { FPFn3 } from "./types.js";
import { StartOfWeekOptions } from "../start-of-week.js";

//#region src/fp/difference-in-calendar-weeks-with-options.d.ts
/**
 * Curried, data-last variant of {@link differenceInCalendarWeeks} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const differenceInCalendarWeeksWithOptions: FPFn3<number, StartOfWeekOptions | undefined, Date, Date>;
//#endregion
export { differenceInCalendarWeeksWithOptions };
//# sourceMappingURL=difference-in-calendar-weeks-with-options.d.ts.map