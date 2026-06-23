import { parseJSON as fn } from '../parse-json.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link parseJSON}. Only the plain `Date`-returning overload (no
 * `options.in`) is available here: unlike the rest of this library's `options` parameters,
 * `parseJSON`'s `options` exists solely to select a `Temporal` return type, not to tweak behavior,
 * so there's no generic options bag to thread through a `parseJSONWithOptions` curried variant.
 *
 * There's only one argument to curry, so unlike the other `fp/` modules this isn't a curried
 * function at all — it's just `parseJSON` itself, included for API parity with date-fns' `fp`.
 */
export const parseJSON: FPFn1<Date, string> = (argument: string) => fn(argument);
