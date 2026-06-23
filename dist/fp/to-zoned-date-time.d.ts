import { FPFn2 } from "./types.js";
import { DateLike } from "../types.js";

//#region src/fp/to-zoned-date-time.d.ts
/**
 * Curried, data-last variant of {@link toZonedDateTime}.
 */
declare const toZonedDateTime: FPFn2<Temporal.ZonedDateTime, string, Date | DateLike>;
//#endregion
export { toZonedDateTime };
//# sourceMappingURL=to-zoned-date-time.d.ts.map