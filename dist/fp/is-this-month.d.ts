import { FPFn1 } from "./types.js";
import { DateLike } from "../types.js";

//#region src/fp/is-this-month.d.ts
/**
 * Curried, data-last variant of {@link isThisMonth}.
 */
declare const isThisMonth: FPFn1<boolean, Date | DateLike>;
//#endregion
export { isThisMonth };
//# sourceMappingURL=is-this-month.d.ts.map