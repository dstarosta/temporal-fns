import { FPFn1 } from "./types.js";
import { DateLike } from "../types.js";

//#region src/fp/to-plain-date.d.ts
/**
 * Curried, data-last variant of {@link toPlainDate}.
 */
declare const toPlainDate: FPFn1<Temporal.PlainDate, Date | DateLike>;
//#endregion
export { toPlainDate };
//# sourceMappingURL=to-plain-date.d.ts.map