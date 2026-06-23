import { describe, expect, it } from 'vitest';
import { isValid as dateFnsIsValid } from 'date-fns';
import { isValid } from '../src/is-valid.js';

const values: unknown[] = [
  new Date(2026, 5, 19),
  new Date('garbage'),
  1750000000000,
  'not a date',
  null,
  undefined,
  {},
];

describe('isValid', () => {
  it.each(values)('matches date-fns for %s', (value) => {
    expect(isValid(value)).toBe(dateFnsIsValid(value));
  });

  it('returns true for Temporal.PlainDate (deliberate API-symmetry overload)', () => {
    expect(isValid(Temporal.PlainDate.from('2026-06-19'))).toBe(true);
  });

  it('returns true for Temporal.PlainDateTime', () => {
    expect(isValid(Temporal.PlainDateTime.from('2026-06-19T10:00:00'))).toBe(true);
  });

  it('returns true for Temporal.ZonedDateTime', () => {
    expect(isValid(Temporal.Now.zonedDateTimeISO('UTC'))).toBe(true);
  });
});
