import { FPFn3 } from "./types.js";
import { Interval } from "../types.js";
import { IntervalOptions } from "../interval.js";

//#region src/fp/interval-with-options.d.ts
/**
 * Curried, data-last variant of {@link interval} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const intervalWithOptions: FPFn3<Interval<Date>, IntervalOptions | undefined, Date, Date>;
//#endregion
export { intervalWithOptions };
//# sourceMappingURL=interval-with-options.d.ts.map