import { describe, expect, it } from 'vitest';
import { eachWeekendOfYear as dateFnsEachWeekendOfYear } from 'date-fns';
import { eachWeekendOfYear } from '../src/each-weekend-of-year.js';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('eachWeekendOfYear', () => {
  it.each(fixtureDates)('matches date-fns for Date input (%s)', (date) => {
    expect(eachWeekendOfYear(date)).toEqual(dateFnsEachWeekendOfYear(date));
  });

  it.each(fixtureDates)('matches date-fns for PlainDate input (%s)', (date) => {
    const expected = dateFnsEachWeekendOfYear(date).map((d) => toPlainDate(d).toString());
    expect(eachWeekendOfYear(toPlainDate(date)).map(String)).toEqual(expected);
  });

  it.each(fixtureDates)('matches date-fns for PlainDateTime input (%s)', (date) => {
    const expected = dateFnsEachWeekendOfYear(date).map((d) => toPlainDateTime(d).toString());
    expect(eachWeekendOfYear(toPlainDateTime(date)).map(String)).toEqual(expected);
  });

  it.each(fixtureDates)('matches date-fns for ZonedDateTime input (%s)', (date) => {
    const expected = dateFnsEachWeekendOfYear(date).map((d) => toZonedDateTime(d).toString());
    expect(eachWeekendOfYear(toZonedDateTime(date)).map(String)).toEqual(expected);
  });
});
