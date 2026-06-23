import { FPFn3 } from "./types.js";
import { IntlFormatDistanceOptions } from "../intl-format-distance.js";

//#region src/fp/intl-format-distance-with-options.d.ts
/**
 * Curried, data-last variant of {@link intlFormatDistance} that also accepts its options parameter (as
 * the first curried argument, i.e. the last positional argument).
 */
declare const intlFormatDistanceWithOptions: FPFn3<string, IntlFormatDistanceOptions | undefined, Date, Date>;
//#endregion
export { intlFormatDistanceWithOptions };
//# sourceMappingURL=intl-format-distance-with-options.d.ts.map