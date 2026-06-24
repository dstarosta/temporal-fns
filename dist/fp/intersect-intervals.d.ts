import { FPFn2 } from "./types.js";
import { Interval } from "../types.js";

//#region src/fp/intersect-intervals.d.ts
/**
 * Curried, data-last variant of {@link intersectIntervals}.
 */
declare const intersectIntervals: FPFn2<Interval<Date> | null, Interval<Date>, Interval<Date>>;
//#endregion
export { intersectIntervals };
//# sourceMappingURL=intersect-intervals.d.ts.map