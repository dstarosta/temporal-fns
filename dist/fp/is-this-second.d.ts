import { FPFn1 } from "./types.js";
import { TimeLike } from "../types.js";

//#region src/fp/is-this-second.d.ts
/**
 * Curried, data-last variant of {@link isThisSecond}.
 */
declare const isThisSecond: FPFn1<boolean, Date | TimeLike>;
//#endregion
export { isThisSecond };
//# sourceMappingURL=is-this-second.d.ts.map