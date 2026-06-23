import { FPFn2 } from "./types.js";
import { Interval } from "../types.js";
import { EachOfIntervalOptions } from "../helpers/create-each-of-interval.js";

//#region src/fp/each-minute-of-interval-with-options.d.ts
/**
 * Curried, data-last variant of {@link eachMinuteOfInterval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const eachMinuteOfIntervalWithOptions: FPFn2<Date[], EachOfIntervalOptions | undefined, Interval<Date>>;
//#endregion
export { eachMinuteOfIntervalWithOptions };
//# sourceMappingURL=each-minute-of-interval-with-options.d.ts.map