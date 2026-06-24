import { FPFn2 } from "./types.js";
import { Duration } from "../format-duration.js";
import { Interval } from "../types.js";

//#region src/fp/count-interval-units.d.ts
/**
 * Curried, data-last variant of {@link countIntervalUnits}.
 */
declare const countIntervalUnits: FPFn2<number, keyof Duration, Interval<Date>>;
//#endregion
export { countIntervalUnits };
//# sourceMappingURL=count-interval-units.d.ts.map