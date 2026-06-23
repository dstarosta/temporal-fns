import { FPFn3 } from "./types.js";
import { StartOfWeekOptions } from "../start-of-week.js";

//#region src/fp/is-same-week-with-options.d.ts
/**
 * Curried, data-last variant of {@link isSameWeek} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const isSameWeekWithOptions: FPFn3<boolean, StartOfWeekOptions | undefined, Date, Date>;
//#endregion
export { isSameWeekWithOptions };
//# sourceMappingURL=is-same-week-with-options.d.ts.map