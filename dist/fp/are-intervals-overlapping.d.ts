import { FPFn2 } from "./types.js";
import { Interval } from "../types.js";

//#region src/fp/are-intervals-overlapping.d.ts
/**
 * Curried, data-last variant of {@link areIntervalsOverlapping}.
 */
declare const areIntervalsOverlapping: FPFn2<boolean, Interval<Date>, Interval<Date>>;
//#endregion
export { areIntervalsOverlapping };
//# sourceMappingURL=are-intervals-overlapping.d.ts.map