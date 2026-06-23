import { FPFn1 } from "./types.js";
import { DateLike } from "../types.js";

//#region src/fp/is-yesterday.d.ts
/**
 * Curried, data-last variant of {@link isYesterday}.
 */
declare const isYesterday: FPFn1<boolean, Date | DateLike>;
//#endregion
export { isYesterday };
//# sourceMappingURL=is-yesterday.d.ts.map