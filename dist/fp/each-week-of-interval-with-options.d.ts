import { FPFn2 } from "./types.js";
import { Interval } from "../types.js";
import { EachWeekOfIntervalOptions } from "../each-week-of-interval.js";

//#region src/fp/each-week-of-interval-with-options.d.ts
/**
 * Curried, data-last variant of {@link eachWeekOfInterval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const eachWeekOfIntervalWithOptions: FPFn2<Date[], EachWeekOfIntervalOptions | undefined, Interval<Date>>;
//#endregion
export { eachWeekOfIntervalWithOptions };
//# sourceMappingURL=each-week-of-interval-with-options.d.ts.map