import { FPFn2 } from "./types.js";
import { Interval } from "../types.js";
import { EachOfIntervalOptions } from "../helpers/create-each-of-interval.js";

//#region src/fp/each-day-of-interval-with-options.d.ts
/**
 * Curried, data-last variant of {@link eachDayOfInterval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const eachDayOfIntervalWithOptions: FPFn2<Date[], EachOfIntervalOptions | undefined, Interval<Date>>;
//#endregion
export { eachDayOfIntervalWithOptions };
//# sourceMappingURL=each-day-of-interval-with-options.d.ts.map