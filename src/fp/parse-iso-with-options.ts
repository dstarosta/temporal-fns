import { parseISO as fn, type ParseISOOptions } from '../parse-iso.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link parseISO} that also accepts its options parameter (as the
 * first curried argument, i.e. the last positional argument). Only the plain `Date`-returning
 * overload (no `options.in`) is available here; see {@link parseISO} for why.
 */
export const parseISOWithOptions: FPFn2<Date, ParseISOOptions | undefined, string> = convertToFP(
  (string: string, options?: ParseISOOptions) => fn(string, options),
  2
) as FPFn2<Date, ParseISOOptions | undefined, string>;
