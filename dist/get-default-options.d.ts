import { DefaultOptions } from "./helpers/default-options.js";

//#region src/get-default-options.d.ts
/**
 * @summary Get default options.
 *
 * @description
 * Returns an object that contains defaults for `options.weekStartsOn` and
 * `options.firstWeekContainsDate` arguments for all functions.
 *
 * You can change these with {@link setDefaultOptions}.
 *
 * @returns The default options
 *
 * @example
 * const result = getDefaultOptions()
 * //=> {}
 *
 * @example
 * setDefaultOptions({ weekStartsOn: 1, firstWeekContainsDate: 4 })
 * const result = getDefaultOptions()
 * //=> { weekStartsOn: 1, firstWeekContainsDate: 4 }
 */
declare function getDefaultOptions(): DefaultOptions;
//#endregion
export { getDefaultOptions };
//# sourceMappingURL=get-default-options.d.ts.map