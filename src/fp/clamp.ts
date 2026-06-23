import { clamp as fn } from '../clamp.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn2 } from './types.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link clamp}.
 */
export const clamp: FPFn2<Date, Interval<Date>, Date> = convertToFP(fn, 2) as FPFn2<
  Date,
  Interval<Date>,
  Date
>;
