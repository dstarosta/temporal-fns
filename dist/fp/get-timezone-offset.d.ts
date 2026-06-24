import { FPFn2 } from "./types.js";
import { DateLike } from "../types.js";

//#region src/fp/get-timezone-offset.d.ts
/**
 * Curried, data-last variant of {@link getTimezoneOffset}.
 */
declare const getTimezoneOffset: FPFn2<number, Date | DateLike | undefined, string>;
//#endregion
export { getTimezoneOffset };
//# sourceMappingURL=get-timezone-offset.d.ts.map