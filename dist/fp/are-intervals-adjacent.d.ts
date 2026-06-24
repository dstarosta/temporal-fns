import { FPFn2 } from "./types.js";
import { Interval } from "../types.js";

//#region src/fp/are-intervals-adjacent.d.ts
/**
 * Curried, data-last variant of {@link areIntervalsAdjacent}.
 */
declare const areIntervalsAdjacent: FPFn2<boolean, Interval<Date>, Interval<Date>>;
//#endregion
export { areIntervalsAdjacent };
//# sourceMappingURL=are-intervals-adjacent.d.ts.map