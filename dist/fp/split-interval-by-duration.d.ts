import { FPFn2 } from "./types.js";
import { Duration } from "../format-duration.js";
import { Interval } from "../types.js";

//#region src/fp/split-interval-by-duration.d.ts
/**
 * Curried, data-last variant of {@link splitIntervalByDuration}.
 */
declare const splitIntervalByDuration: FPFn2<Interval<Date>[], Duration, Interval<Date>>;
//#endregion
export { splitIntervalByDuration };
//# sourceMappingURL=split-interval-by-duration.d.ts.map