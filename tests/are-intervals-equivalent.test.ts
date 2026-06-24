import { describe, expect, it } from 'vitest';
import { areIntervalsEquivalent } from '../src/are-intervals-equivalent.js';
import { toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('areIntervalsEquivalent', () => {
  const cases: {
    left: { start: Date; end: Date };
    right: { start: Date; end: Date };
    expected: boolean;
    label: string;
  }[] = [
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      expected: true,
      label: 'identical intervals',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 20), end: new Date(2014, 0, 10) },
      expected: true,
      label: 'one reversed - normalized before comparing',
    },
    {
      left: { start: new Date(2014, 0, 20), end: new Date(2014, 0, 10) },
      right: { start: new Date(2014, 0, 20), end: new Date(2014, 0, 10) },
      expected: true,
      label: 'both reversed - normalized before comparing',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 21) },
      expected: false,
      label: 'different end',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 12), end: new Date(2014, 0, 20) },
      expected: false,
      label: 'different start',
    },
  ];

  for (const { left, right, expected, label } of cases) {
    it(`for Date input (${label})`, () => {
      expect(areIntervalsEquivalent(left, right)).toBe(expected);
    });

    it(`for PlainDate input (${label})`, () => {
      const leftP = { start: toPlainDate(left.start), end: toPlainDate(left.end) };
      const rightP = { start: toPlainDate(right.start), end: toPlainDate(right.end) };
      expect(areIntervalsEquivalent(leftP, rightP)).toBe(expected);
    });

    it(`for PlainDateTime input (${label})`, () => {
      const leftP = { start: toPlainDateTime(left.start), end: toPlainDateTime(left.end) };
      const rightP = { start: toPlainDateTime(right.start), end: toPlainDateTime(right.end) };
      expect(areIntervalsEquivalent(leftP, rightP)).toBe(expected);
    });

    it(`for ZonedDateTime input (${label})`, () => {
      const leftP = { start: toZonedDateTime(left.start), end: toZonedDateTime(left.end) };
      const rightP = { start: toZonedDateTime(right.start), end: toZonedDateTime(right.end) };
      expect(areIntervalsEquivalent(leftP, rightP)).toBe(expected);
    });
  }
});
