import { FPFn4 } from "./types.js";
import { Duration } from "../format-duration.js";
import { Interval } from "../types.js";

//#region src/fp/slice-interval.d.ts
/**
 * Curried, data-last variant of {@link sliceInterval}.
 */
declare const sliceInterval: FPFn4<Interval<Date> | null, number | undefined, number, Duration, Interval<Date>>;
//#endregion
export { sliceInterval };
//# sourceMappingURL=slice-interval.d.ts.map