import { isTemporal as fn } from '../is-temporal.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link isTemporal}.
 */
export const isTemporal: FPFn1<boolean, unknown> = convertToFP(fn, 1) as FPFn1<boolean, unknown>;
