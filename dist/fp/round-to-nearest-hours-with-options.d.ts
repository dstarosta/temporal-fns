import { FPFn2 } from "./types.js";
import { RoundToNearestHoursOptions } from "../round-to-nearest-hours.js";

//#region src/fp/round-to-nearest-hours-with-options.d.ts
/**
 * Curried, data-last variant of {@link roundToNearestHours} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const roundToNearestHoursWithOptions: FPFn2<Date, RoundToNearestHoursOptions | undefined, Date>;
//#endregion
export { roundToNearestHoursWithOptions };
//# sourceMappingURL=round-to-nearest-hours-with-options.d.ts.map