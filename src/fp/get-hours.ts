import { getHours as fn } from '../get-hours.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link getHours}.
 */
export const getHours: FPFn1<number, Date> = convertToFP(fn, 1) as FPFn1<number, Date>;
