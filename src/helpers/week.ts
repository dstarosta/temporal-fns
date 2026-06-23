import { dateToPlainDateTime } from './convert.js';
import { type DateLike } from '../types.js';

// date-fns convention: Sunday = 0 ... Saturday = 6
// Temporal convention (ISO 8601): Monday = 1 ... Sunday = 7
export function isoDayOfWeekToSundayBased(isoDayOfWeek: number): number {
  return isoDayOfWeek % 7;
}

export function getDayValue(date: Date | DateLike): number {
  const dayOfWeek = date instanceof Date ? dateToPlainDateTime(date).dayOfWeek : date.dayOfWeek;
  return isoDayOfWeekToSundayBased(dayOfWeek);
}
