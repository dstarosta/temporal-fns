import { FPFn1 } from "./types.js";
import { Duration } from "../format-duration.js";
import { Interval } from "../types.js";

//#region src/fp/interval-to-duration.d.ts
/**
 * Curried, data-last variant of {@link intervalToDuration}.
 */
declare const intervalToDuration: FPFn1<Duration, Interval<Date>>;
//#endregion
export { intervalToDuration };
//# sourceMappingURL=interval-to-duration.d.ts.map