import { lastDayOfDecade as fn } from '../last-day-of-decade.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';

/**
 * Curried, data-last variant of {@link lastDayOfDecade}.
 */
export const lastDayOfDecade: FPFn1<Date, Date> = convertToFP(fn, 1) as FPFn1<Date, Date>;
