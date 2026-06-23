import { FPFn1 } from "./types.js";
import { DateLike } from "../types.js";

//#region src/fp/is-today.d.ts
/**
 * Curried, data-last variant of {@link isToday}.
 */
declare const isToday: FPFn1<boolean, Date | DateLike>;
//#endregion
export { isToday };
//# sourceMappingURL=is-today.d.ts.map