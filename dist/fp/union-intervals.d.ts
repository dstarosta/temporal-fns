import { FPFn2 } from "./types.js";
import { Interval } from "../types.js";

//#region src/fp/union-intervals.d.ts
/**
 * Curried, data-last variant of {@link unionIntervals}.
 */
declare const unionIntervals: FPFn2<Interval<Date>, Interval<Date>, Interval<Date>>;
//#endregion
export { unionIntervals };
//# sourceMappingURL=union-intervals.d.ts.map