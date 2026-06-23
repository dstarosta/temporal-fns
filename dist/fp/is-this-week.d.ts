import { FPFn1 } from "./types.js";
import { DateLike } from "../types.js";

//#region src/fp/is-this-week.d.ts
/**
 * Curried, data-last variant of {@link isThisWeek}.
 */
declare const isThisWeek: FPFn1<boolean, Date | DateLike>;
//#endregion
export { isThisWeek };
//# sourceMappingURL=is-this-week.d.ts.map