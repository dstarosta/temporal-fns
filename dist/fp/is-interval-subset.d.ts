import { FPFn2 } from "./types.js";
import { Interval } from "../types.js";

//#region src/fp/is-interval-subset.d.ts
/**
 * Curried, data-last variant of {@link isIntervalSubset}.
 */
declare const isIntervalSubset: FPFn2<boolean, Interval<Date>, Interval<Date>>;
//#endregion
export { isIntervalSubset };
//# sourceMappingURL=is-interval-subset.d.ts.map