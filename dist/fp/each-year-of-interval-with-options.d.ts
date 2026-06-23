import { FPFn2 } from "./types.js";
import { Interval } from "../types.js";
import { EachOfIntervalOptions } from "../helpers/create-each-of-interval.js";

//#region src/fp/each-year-of-interval-with-options.d.ts
/**
 * Curried, data-last variant of {@link eachYearOfInterval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const eachYearOfIntervalWithOptions: FPFn2<Date[], EachOfIntervalOptions | undefined, Interval<Date>>;
//#endregion
export { eachYearOfIntervalWithOptions };
//# sourceMappingURL=each-year-of-interval-with-options.d.ts.map