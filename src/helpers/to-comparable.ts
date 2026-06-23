import { dateToPlainDateTime } from './convert.js';
import { type DateLike } from '../types.js';

export function toComparable(date: Date | DateLike): Temporal.PlainDateTime | DateLike {
  return date instanceof Date ? dateToPlainDateTime(date) : date;
}
