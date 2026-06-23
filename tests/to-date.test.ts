import { describe, expect, it } from 'vitest';
import { toDate as dateFnsToDate } from 'date-fns';
import { toDate } from '../src/to-date.js';

const values: unknown[] = [
  new Date(2026, 5, 19, 14, 32, 10, 250),
  new Date('garbage'),
  1750000000000,
  'not a date',
  null,
  undefined,
  {},
];

describe('toDate', () => {
  it.each(values)('matches date-fns for %s', (value) => {
    expect(toDate(value).toString()).toBe(
      dateFnsToDate(value as Parameters<typeof dateFnsToDate>[0]).toString()
    );
  });

  it('clones, does not return the same Date instance', () => {
    const original = new Date(2026, 5, 19);
    const cloned = toDate(original);
    expect(cloned).not.toBe(original);
    expect(cloned.getTime()).toBe(original.getTime());
  });
});
