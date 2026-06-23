import { FPFn2 } from "./types.js";
import { Interval } from "../types.js";
import { EachOfIntervalOptions } from "../helpers/create-each-of-interval.js";

//#region src/fp/each-month-of-interval-with-options.d.ts
/**
 * Curried, data-last variant of {@link eachMonthOfInterval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const eachMonthOfIntervalWithOptions: FPFn2<Date[], EachOfIntervalOptions | undefined, Interval<Date>>;
//#endregion
export { eachMonthOfIntervalWithOptions };
//# sourceMappingURL=each-month-of-interval-with-options.d.ts.map