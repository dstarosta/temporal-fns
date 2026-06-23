import { FPFn1 } from "./types.js";
import { DateLike } from "../types.js";

//#region src/fp/is-this-quarter.d.ts
/**
 * Curried, data-last variant of {@link isThisQuarter}.
 */
declare const isThisQuarter: FPFn1<boolean, Date | DateLike>;
//#endregion
export { isThisQuarter };
//# sourceMappingURL=is-this-quarter.d.ts.map