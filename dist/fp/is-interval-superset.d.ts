import { FPFn2 } from "./types.js";
import { Interval } from "../types.js";

//#region src/fp/is-interval-superset.d.ts
/**
 * Curried, data-last variant of {@link isIntervalSuperset}.
 */
declare const isIntervalSuperset: FPFn2<boolean, Interval<Date>, Interval<Date>>;
//#endregion
export { isIntervalSuperset };
//# sourceMappingURL=is-interval-superset.d.ts.map