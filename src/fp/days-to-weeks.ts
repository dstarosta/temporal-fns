import { daysToWeeks as fn } from '../days-to-weeks.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link daysToWeeks}.
 */
export const daysToWeeks: FPFn1<number, number> = convertToFP(fn, 1) as FPFn1<number, number>;
