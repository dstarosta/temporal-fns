import { subHours as fn } from '../sub-hours.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';

/**
 * Curried, data-last variant of {@link subHours}.
 */
export const subHours: FPFn2<Date, number, Date> = convertToFP(fn, 2) as FPFn2<Date, number, Date>;
