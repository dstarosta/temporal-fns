import { describe, expect, it } from 'vitest';
import { intervalToDuration as dateFnsIntervalToDuration } from 'date-fns';
import { intervalToDuration } from '../src/interval-to-duration.js';
import { toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

describe('intervalToDuration', () => {
  // None of these remaining-days counts reach 7, so they don't exercise the weeks divergence
  // covered separately below.
  const cases: [Date, Date][] = [
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

describe('intervalToDuration: deliberate divergence from date-fns for spans of 7+ remaining days', () => {
  // Real date-fns' intervalToDuration never produces `weeks`, even though Duration declares it -
  // a 14-day remainder is always reported as `{ days: 14 }`. temporal-fns decomposes the
  // remainder into weeks (an unambiguous, fixed 7-day unit) plus a days remainder instead.
  const start = new Date(2014, 8, 1, 10, 19, 50);
  const end = new Date(2017, 5, 15, 15, 29, 20); // 14 days left over after years/months

  it('date-fns reports the remainder as days only, no weeks', () => {
    const result = dateFnsIntervalToDuration({ start, end });
    expect(result).toMatchObject({ years: 2, months: 9, days: 14 });
    expect(result.weeks).toBeUndefined();
  });

  it('temporal-fns reports weeks plus a days remainder', () => {
    const result = intervalToDuration({ start, end });
    expect(result).toMatchObject({
      years: 2,
      months: 9,
      weeks: 2,
      hours: 5,
      minutes: 9,
      seconds: 30,
    });
    expect(result.days).toBeUndefined();
  });

  it('agrees with date-fns on every field except weeks/days', () => {
    const dfResult = dateFnsIntervalToDuration({ start, end });
    const ourResult = intervalToDuration({ start, end });
    expect(ourResult.years).toBe(dfResult.years);
    expect(ourResult.months).toBe(dfResult.months);
    expect((ourResult.weeks ?? 0) * 7 + (ourResult.days ?? 0)).toBe(dfResult.days);
    expect(ourResult.hours).toBe(dfResult.hours);
    expect(ourResult.minutes).toBe(dfResult.minutes);
    expect(ourResult.seconds).toBe(dfResult.seconds);
  });

  it('a remainder under 7 days still reports days, not a zero weeks field', () => {
    const result = intervalToDuration({ start: new Date(2020, 0, 1), end: new Date(2020, 0, 4) });
    expect(result).toEqual({ days: 3 });
  });

  it('an exact multiple of 7 days reports weeks with no days field', () => {
    const result = intervalToDuration({ start: new Date(2020, 0, 1), end: new Date(2020, 0, 15) });
    expect(result).toEqual({ weeks: 2 });
  });
});
