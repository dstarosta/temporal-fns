import { FPFn1 } from "./types.js";
import { DateLike } from "../types.js";

//#region src/fp/is-this-year.d.ts
/**
 * Curried, data-last variant of {@link isThisYear}.
 */
declare const isThisYear: FPFn1<boolean, Date | DateLike>;
//#endregion
export { isThisYear };
//# sourceMappingURL=is-this-year.d.ts.map