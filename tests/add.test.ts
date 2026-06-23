import { describe, expect, it } from 'vitest';
import { add as dateFnsAdd } from 'date-fns';
import { add } from '../src/add.js';
import { toPlainDate, toPlainDateTime, toUTCDate, toZonedDateTime } from './helpers/fixtures.js';

describe('add', () => {
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

  it('matches date-fns for the full Duration example', () => {
    expect(add(base, fullDuration)).toEqual(dateFnsAdd(base, fullDuration));
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
      expect(add(base, duration)).toEqual(dateFnsAdd(base, duration));
    });
  }

  it('matches date-fns across a DST spring-forward boundary', () => {
    const beforeDST = new Date(2024, 2, 10, 1, 30);
    expect(add(beforeDST, { hours: 1 })).toEqual(dateFnsAdd(beforeDST, { hours: 1 }));
  });

  it('matches date-fns for ZonedDateTime input', () => {
    expect(add(toZonedDateTime(base), fullDuration)).toEqual(
      toZonedDateTime(dateFnsAdd(base, fullDuration))
    );
  });

  it('matches date-fns+UTCDate for PlainDateTime input', () => {
    expect(add(toPlainDateTime(base), fullDuration)).toEqual(
      toPlainDateTime(dateFnsAdd(toUTCDate(base), fullDuration))
    );
  });

  it('matches date-fns+UTCDate for PlainDate input with no time fields', () => {
    const dateOnlyDuration = { years: 1, months: 2, weeks: 1, days: 3 };
    expect(add(toPlainDate(base), dateOnlyDuration)).toEqual(
      toPlainDate(dateFnsAdd(toUTCDate(base), dateOnlyDuration))
    );
  });

  it('throws TypeError for PlainDate input with hours in the duration', () => {
    expect(() => add(toPlainDate(base), { hours: 1 })).toThrow(TypeError);
  });

  it('throws TypeError for PlainDate input with minutes in the duration', () => {
    expect(() => add(toPlainDate(base), { minutes: 1 })).toThrow(TypeError);
  });

  it('throws TypeError for PlainDate input with seconds in the duration', () => {
    expect(() => add(toPlainDate(base), { seconds: 1 })).toThrow(TypeError);
  });
});
