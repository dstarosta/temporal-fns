import { FPFn3 } from "./types.js";
import { Interval } from "../types.js";
import { AreIntervalsOverlappingOptions } from "../are-intervals-overlapping.js";

//#region src/fp/are-intervals-overlapping-with-options.d.ts
/**
 * Curried, data-last variant of {@link areIntervalsOverlapping} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const areIntervalsOverlappingWithOptions: FPFn3<boolean, AreIntervalsOverlappingOptions | undefined, Interval<Date>, Interval<Date>>;
//#endregion
export { areIntervalsOverlappingWithOptions };
//# sourceMappingURL=are-intervals-overlapping-with-options.d.ts.map