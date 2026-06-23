import { describe, expect, it } from 'vitest';
import { intervalToDuration as dateFnsIntervalToDuration } from 'date-fns';
import { intervalToDuration } from '../src/interval-to-duration.js';
import { toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

describe('intervalToDuration', () => {
  const cases: [Date, Date][] = [
    [new Date(2014, 8, 1, 10, 19, 50), new Date(2017, 5, 15, 15, 29, 20)],
    [new Date(2020, 0, 1), new Date(2020, 0, 1)],
    [new Date(2020, 0, 1), new Date(2020, 0, 1, 0, 0, 30)],
    [new Date(2020, 0, 31), new Date(2020, 1, 1)],
    [new Date(2020, 1, 1), new Date(2020, 0, 31)],
    [new Date(2024, 1, 29), new Date(2025, 1, 28)],
  ];

  for (const [start, end] of cases) {
    it(`matches date-fns for Date input (${start.toISOString()} -> ${end.toISOString()})`, () => {
      expect(intervalToDuration({ start, end })).toEqual(dateFnsIntervalToDuration({ start, end }));
    });

    it(`matches date-fns for ZonedDateTime input (${start.toISOString()} -> ${end.toISOString()})`, () => {
      expect(
        intervalToDuration({ start: toZonedDateTime(start), end: toZonedDateTime(end) })
      ).toEqual(dateFnsIntervalToDuration({ start, end }));
    });

    it(`matches date-fns+UTCDate for PlainDateTime input (${start.toISOString()} -> ${end.toISOString()})`, () => {
      expect(
        intervalToDuration({ start: toPlainDateTime(start), end: toPlainDateTime(end) })
      ).toEqual(dateFnsIntervalToDuration({ start: toUTCDate(start), end: toUTCDate(end) }));
    });
  }
});
