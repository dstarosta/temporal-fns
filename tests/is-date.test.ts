import { describe, expect, it } from 'vitest';
import { isDate as dateFnsIsDate } from 'date-fns';
import { isDate } from '../src/is-date.js';

const values: unknown[] = [
  new Date(2026, 5, 19),
  new Date('garbage'),
  1750000000000,
  'not a date',
  null,
  undefined,
  {},
  Temporal.PlainDate.from('2026-06-19'),
];

describe('isDate', () => {
  it.each(values)('matches date-fns for %s', (value) => {
    expect(isDate(value)).toBe(dateFnsIsDate(value));
  });
});
