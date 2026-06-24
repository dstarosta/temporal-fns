import { isIntervalEmpty as fn } from '../is-interval-empty.js';
import { convertToFP } from './helpers/convert-to-fp.js';
import { type FPFn1 } from './types.js';
import { type Interval } from '../types.js';

/**
 * Curried, data-last variant of {@link isIntervalEmpty}.
 */
export const isIntervalEmpty: FPFn1<boolean, Interval<Date>> = convertToFP(fn, 1) as FPFn1<
  boolean,
  Interval<Date>
>;
