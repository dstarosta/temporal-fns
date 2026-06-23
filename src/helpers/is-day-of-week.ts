import { dateToPlainDateTime } from './convert.js';
import { isoDayOfWeekToSundayBased } from './week.js';
import { type DateLike } from '../types.js';

export function createIsDayOfWeek(sundayBasedDay: number) {
  function isDayOfWeek(date: Date): boolean;
  function isDayOfWeek(date: DateLike): boolean;
  function isDayOfWeek(date: Date | DateLike): boolean {
    const dayOfWeek = date instanceof Date ? dateToPlainDateTime(date).dayOfWeek : date.dayOfWeek;
    return isoDayOfWeekToSundayBased(dayOfWeek) === sundayBasedDay;
  }
  return isDayOfWeek;
}
