import { describe, expect, it } from 'vitest';
import { sub as dateFnsSub } from 'date-fns';
import { sub } from '../src/sub.js';
import { toPlainDate, toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

describe('sub', () => {
  const base = new Date(2014, 8, 1, 10, 19, 50);
  const fullDuration = {
    years: 2,
    months: 9,
    weeks: 1,
    days: 7,
    hours: 5,
    minutes: 9,
    seconds: 30,
  };

  it('matches date-fns for a full duration', () => {
    expect(sub(base, fullDuration)).toEqual(dateFnsSub(base, fullDuration));
  });

  const partials = [
    { years: 1 },
    { months: 3 },
    { weeks: 2 },
    { days: 5 },
    { hours: 3 },
    { minutes: 45 },
    { seconds: 20 },
    { years: -1, months: -2 },
    { days: -10 },
    {},
  ];

  for (const duration of partials) {
    it(`matches date-fns for partial duration ${JSON.stringify(duration)}`, () => {
      expect(sub(base, duration)).toEqual(dateFnsSub(base, duration));
    });
  }

  it('matches date-fns across a DST fall-back boundary', () => {
    const afterDST = new Date(2024, 10, 3, 1, 30);
    expect(sub(afterDST, { hours: 1 })).toEqual(dateFnsSub(afterDST, { hours: 1 }));
  });

  it('matches date-fns for ZonedDateTime input', () => {
    expect(sub(toZonedDateTime(base), fullDuration)).toEqual(
      toZonedDateTime(dateFnsSub(base, fullDuration))
    );
  });

  it('matches date-fns+UTCDate for PlainDateTime input', () => {
    expect(sub(toPlainDateTime(base), fullDuration)).toEqual(
      toPlainDateTime(dateFnsSub(toUTCDate(base), fullDuration))
    );
  });

  it('matches date-fns+UTCDate for PlainDate input with no time fields', () => {
    const dateOnlyDuration = { years: 1, months: 2, weeks: 1, days: 3 };
    expect(sub(toPlainDate(base), dateOnlyDuration)).toEqual(
      toPlainDate(dateFnsSub(toUTCDate(base), dateOnlyDuration))
    );
  });

  it('throws TypeError for PlainDate input with hours in the duration', () => {
    expect(() => sub(toPlainDate(base), { hours: 1 })).toThrow(TypeError);
  });

  it('throws TypeError for PlainDate input with minutes in the duration', () => {
    expect(() => sub(toPlainDate(base), { minutes: 1 })).toThrow(TypeError);
  });

  it('throws TypeError for PlainDate input with seconds in the duration', () => {
    expect(() => sub(toPlainDate(base), { seconds: 1 })).toThrow(TypeError);
  });
});
