import { FPFn2 } from "./types.js";
import { Interval } from "../types.js";
import { EachOfIntervalOptions } from "../helpers/create-each-of-interval.js";

//#region src/fp/each-quarter-of-interval-with-options.d.ts
/**
 * Curried, data-last variant of {@link eachQuarterOfInterval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const eachQuarterOfIntervalWithOptions: FPFn2<Date[], EachOfIntervalOptions | undefined, Interval<Date>>;
//#endregion
export { eachQuarterOfIntervalWithOptions };
//# sourceMappingURL=each-quarter-of-interval-with-options.d.ts.map