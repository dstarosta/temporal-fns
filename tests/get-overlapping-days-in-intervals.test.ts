import { UTCDate } from '@date-fns/utc';
import { describe, expect, it } from 'vitest';
import { getOverlappingDaysInIntervals as dateFnsGetOverlappingDaysInIntervals } from 'date-fns';
import { getOverlappingDaysInIntervals } from '../src/get-overlapping-days-in-intervals.js';
import { toPlainDate, toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

function midnightUTC(date: Date): UTCDate {
  return new UTCDate(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

describe('getOverlappingDaysInIntervals', () => {
  const cases: {
    left: { start: Date; end: Date };
    right: { start: Date; end: Date };
    label: string;
  }[] = [
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) },
      label: 'overlapping',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) },
      label: 'non-overlapping',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 10) },
      label: 'zero-length',
    },
    {
      left: { start: new Date(2014, 0, 20), end: new Date(2014, 0, 10) },
      right: { start: new Date(2014, 0, 21), end: new Date(2014, 0, 17) },
      label: 'inverted intervals',
    },
    {
      left: { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) },
      right: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      label: 'right fully contains left',
    },
    {
      left: { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
      right: { start: new Date(2014, 0, 12), end: new Date(2014, 0, 18) },
      label: 'left fully contains right',
    },
  ];

  for (const { left, right, label } of cases) {
    const expected = dateFnsGetOverlappingDaysInIntervals(left, right);

    it(`matches date-fns for Date input (${label})`, () => {
      expect(getOverlappingDaysInIntervals(left, right)).toBe(expected);
    });

    it(`matches date-fns for ZonedDateTime input (${label})`, () => {
      const leftZ = { start: toZonedDateTime(left.start), end: toZonedDateTime(left.end) };
      const rightZ = { start: toZonedDateTime(right.start), end: toZonedDateTime(right.end) };
      expect(getOverlappingDaysInIntervals(leftZ, rightZ)).toBe(expected);
    });

    it(`matches date-fns+UTCDate for PlainDateTime input (${label})`, () => {
      const leftP = { start: toPlainDateTime(left.start), end: toPlainDateTime(left.end) };
      const rightP = { start: toPlainDateTime(right.start), end: toPlainDateTime(right.end) };
      const utcLeft: { start: UTCDate; end: UTCDate } = {
        start: toUTCDate(left.start),
        end: toUTCDate(left.end),
      };
      const utcRight: { start: UTCDate; end: UTCDate } = {
        start: toUTCDate(right.start),
        end: toUTCDate(right.end),
      };
      expect(getOverlappingDaysInIntervals(leftP, rightP)).toBe(
        dateFnsGetOverlappingDaysInIntervals(utcLeft, utcRight)
      );
    });

    it(`matches date-fns+UTCDate for PlainDate input (${label})`, () => {
      const leftP = { start: toPlainDate(left.start), end: toPlainDate(left.end) };
      const rightP = { start: toPlainDate(right.start), end: toPlainDate(right.end) };
      const utcLeft = { start: midnightUTC(left.start), end: midnightUTC(left.end) };
      const utcRight = { start: midnightUTC(right.start), end: midnightUTC(right.end) };
      expect(getOverlappingDaysInIntervals(leftP, rightP)).toBe(
        dateFnsGetOverlappingDaysInIntervals(utcLeft, utcRight)
      );
    });
  }

  // DST-negation is only meaningful for real-timezone types (Date, ZonedDateTime).
  // PlainDateTime carries no timezone (treated as UTC per the UTC rule), so a
  // "DST spring-forward" comparison against UTCDate (which has no DST) is not
  // a meaningful equivalence and is intentionally excluded here.
  it('matches date-fns for Date input across a DST spring-forward', () => {
    // US DST 2026 starts March 8
    const left = { start: new Date(2026, 2, 5), end: new Date(2026, 2, 12) };
    const right = { start: new Date(2026, 2, 7), end: new Date(2026, 2, 15) };
    expect(getOverlappingDaysInIntervals(left, right)).toBe(
      dateFnsGetOverlappingDaysInIntervals(left, right)
    );
  });

  it('matches date-fns for ZonedDateTime input across a DST spring-forward', () => {
    const left = { start: new Date(2026, 2, 5), end: new Date(2026, 2, 12) };
    const right = { start: new Date(2026, 2, 7), end: new Date(2026, 2, 15) };
    const leftZ = { start: toZonedDateTime(left.start), end: toZonedDateTime(left.end) };
    const rightZ = { start: toZonedDateTime(right.start), end: toZonedDateTime(right.end) };
    expect(getOverlappingDaysInIntervals(leftZ, rightZ)).toBe(
      dateFnsGetOverlappingDaysInIntervals(left, right)
    );
  });
});
