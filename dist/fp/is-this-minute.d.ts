import { FPFn1 } from "./types.js";
import { TimeLike } from "../types.js";

//#region src/fp/is-this-minute.d.ts
/**
 * Curried, data-last variant of {@link isThisMinute}.
 */
declare const isThisMinute: FPFn1<boolean, Date | TimeLike>;
//#endregion
export { isThisMinute };
//# sourceMappingURL=is-this-minute.d.ts.map