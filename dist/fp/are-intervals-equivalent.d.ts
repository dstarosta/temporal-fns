import { FPFn2 } from "./types.js";
import { Interval } from "../types.js";

//#region src/fp/are-intervals-equivalent.d.ts
/**
 * Curried, data-last variant of {@link areIntervalsEquivalent}.
 */
declare const areIntervalsEquivalent: FPFn2<boolean, Interval<Date>, Interval<Date>>;
//#endregion
export { areIntervalsEquivalent };
//# sourceMappingURL=are-intervals-equivalent.d.ts.map