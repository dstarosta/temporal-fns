import { isIntervalSubsetValue } from './is-interval-subset.js';
import { type DateLike, type Interval } from './types.js';

/**
 * @summary Does `intervalLeft` fully contain `intervalRight`?
 *
 * @description
 * Does `intervalLeft` fully contain `intervalRight`? Uses the non-strict (⊇) definition: an
 * interval is a superset of an equal interval, and a superset of itself. Equivalent to
 * `isIntervalSubset(intervalRight, intervalLeft)`.
 *
 * @param intervalLeft - The interval that might contain `intervalRight`
 * @param intervalRight - The interval to check
 *
 * @returns Whether `intervalLeft` fully contains `intervalRight`
 *
 * @example
 * isIntervalSuperset(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) }
 * )
 * //=> true
 */
export function isIntervalSuperset(
  intervalLeft: Interval<Date>,
  intervalRight: Interval<Date>
): boolean;
/**
 * @summary Does `intervalLeft` fully contain `intervalRight`?
 *
 * @description
 * Does `intervalLeft` fully contain `intervalRight`? Uses the non-strict (⊇) definition: an
 * interval is a superset of an equal interval, and a superset of itself. Equivalent to
 * `isIntervalSubset(intervalRight, intervalLeft)`.
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `intervalLeft`/`intervalRight`, which must share the
 * same concrete type.
 *
 * @param intervalLeft - The interval that might contain `intervalRight`
 * @param intervalRight - The interval to check
 *
 * @returns Whether `intervalLeft` fully contains `intervalRight`
 *
 * @example
 * isIntervalSuperset(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) }
 * )
 * //=> true
 */
export function isIntervalSuperset<T extends DateLike>(
  intervalLeft: Interval<T>,
  intervalRight: Interval<T>
): boolean;
export function isIntervalSuperset(
  intervalLeft: Interval<Date | DateLike>,
  intervalRight: Interval<Date | DateLike>
): boolean {
  const potentialSuperset = intervalLeft;
  const potentialSubset = intervalRight;
  return isIntervalSubsetValue(potentialSubset, potentialSuperset);
}
