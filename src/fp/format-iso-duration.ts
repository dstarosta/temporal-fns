import { formatISODuration as fn, type ISODuration } from '../format-iso-duration.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link formatISODuration}.
 */
export const formatISODuration: FPFn1<string, ISODuration> = convertToFP(fn, 1) as FPFn1<
  string,
  ISODuration
>;
