import { FPFn2 } from "./types.js";
import { Interval } from "../types.js";

//#region src/fp/is-within-interval.d.ts
/**
 * Curried, data-last variant of {@link isWithinInterval}.
 */
declare const isWithinInterval: FPFn2<boolean, Interval<Date>, Date>;
//#endregion
export { isWithinInterval };
//# sourceMappingURL=is-within-interval.d.ts.map