import { FPFn1 } from "./types.js";
import { TimeLike } from "../types.js";

//#region src/fp/is-this-hour.d.ts
/**
 * Curried, data-last variant of {@link isThisHour}.
 */
declare const isThisHour: FPFn1<boolean, Date | TimeLike>;
//#endregion
export { isThisHour };
//# sourceMappingURL=is-this-hour.d.ts.map