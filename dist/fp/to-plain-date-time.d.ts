import { FPFn1 } from "./types.js";
import { DateLike } from "../types.js";

//#region src/fp/to-plain-date-time.d.ts
/**
 * Curried, data-last variant of {@link toPlainDateTime}.
 */
declare const toPlainDateTime: FPFn1<Temporal.PlainDateTime, Date | DateLike>;
//#endregion
export { toPlainDateTime };
//# sourceMappingURL=to-plain-date-time.d.ts.map