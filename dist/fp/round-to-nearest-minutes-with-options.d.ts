import { FPFn2 } from "./types.js";
import { RoundToNearestMinutesOptions } from "../round-to-nearest-minutes.js";

//#region src/fp/round-to-nearest-minutes-with-options.d.ts
/**
 * Curried, data-last variant of {@link roundToNearestMinutes} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const roundToNearestMinutesWithOptions: FPFn2<Date, RoundToNearestMinutesOptions | undefined, Date>;
//#endregion
export { roundToNearestMinutesWithOptions };
//# sourceMappingURL=round-to-nearest-minutes-with-options.d.ts.map