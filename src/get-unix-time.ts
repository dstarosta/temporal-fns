import { toEpochMilliseconds } from './helpers/to-epoch-milliseconds.js';
import { type DateLike } from './types.js';

/**
 * @summary Get the seconds timestamp of the given date.
 *
 * @description
 * Get the seconds timestamp of the given date.
 *
 * @param date - The given date
 *
 * @returns The timestamp
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05:
 * const result = getUnixTime(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 1330512305
 */
export function getUnixTime(date: Date): number;
export function getUnixTime(date: DateLike): number;
export function getUnixTime(date: Date | DateLike): number {
  return Math.trunc(toEpochMilliseconds(date) / 1000);
}
