import { describe, expect, it } from 'vitest';
import { isIntervalSuperset } from '../src/is-interval-superset.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('isIntervalSuperset', () => {
  const cases: {
    left: { start: Date; end: Date };
    right: { start: Date; end: Date };
    expected: boolean;
    label: string;
  }[] = [
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) },
      expected: true,
      label: 'fully contains',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      expected: true,
      label: 'equal intervals are supersets of each other (non-strict)',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 17), end: new Date(2014, 0, 24) },
      expected: false,
      label: 'right extends past left end',
    },
  ];

  for (const { left, right, expected, label } of cases) {
    it(`for Date input (${label})`, () => {
      expect(isIntervalSuperset(left, right)).toBe(expected);
    });

    it(`for PlainDate input (${label})`, () => {
      const leftP = { start: toPlainDate(left.start), end: toPlainDate(left.end) };
      const rightP = { start: toPlainDate(right.start), end: toPlainDate(right.end) };
      expect(isIntervalSuperset(leftP, rightP)).toBe(expected);
    });

    it(`for PlainDateTime input (${label})`, () => {
      const leftP = { start: toPlainDateTime(left.start), end: toPlainDateTime(left.end) };
      const rightP = { start: toPlainDateTime(right.start), end: toPlainDateTime(right.end) };
      expect(isIntervalSuperset(leftP, rightP)).toBe(expected);
    });

    it(`for ZonedDateTime input (${label})`, () => {
      const leftP = { start: toZonedDateTime(left.start), end: toZonedDateTime(left.end) };
      const rightP = { start: toZonedDateTime(right.start), end: toZonedDateTime(right.end) };
      expect(isIntervalSuperset(leftP, rightP)).toBe(expected);
    });
  }

  it('composes with areIntervalsEquivalent to express strict superset (⊋)', () => {
    const equal = { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) };
    expect(isIntervalSuperset(equal, equal)).toBe(true);
  });
});
