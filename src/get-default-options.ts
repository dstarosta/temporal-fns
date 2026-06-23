import { getDefaultOptionsValue, type DefaultOptions } from './helpers/default-options.js';

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
export function getDefaultOptions(): DefaultOptions {
  return { ...getDefaultOptionsValue() };
}
