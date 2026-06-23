import { describe, expect, it } from 'vitest';
import { eachWeekendOfMonth as dateFnsEachWeekendOfMonth } from 'date-fns';
import { eachWeekendOfMonth } from '../src/each-weekend-of-month.js';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

describe('eachWeekendOfMonth', () => {
  it.each(fixtureDates)('matches date-fns for Date input (%s)', (date) => {
    expect(eachWeekendOfMonth(date)).toEqual(dateFnsEachWeekendOfMonth(date));
  });

  it.each(fixtureDates)('matches date-fns for PlainDate input (%s)', (date) => {
    const expected = dateFnsEachWeekendOfMonth(date).map((d) => toPlainDate(d).toString());
    expect(eachWeekendOfMonth(toPlainDate(date)).map(String)).toEqual(expected);
  });

  it.each(fixtureDates)('matches date-fns for PlainDateTime input (%s)', (date) => {
    const expected = dateFnsEachWeekendOfMonth(date).map((d) => toPlainDateTime(d).toString());
    expect(eachWeekendOfMonth(toPlainDateTime(date)).map(String)).toEqual(expected);
  });

  it.each(fixtureDates)('matches date-fns for ZonedDateTime input (%s)', (date) => {
    const expected = dateFnsEachWeekendOfMonth(date).map((d) => toZonedDateTime(d).toString());
    expect(eachWeekendOfMonth(toZonedDateTime(date)).map(String)).toEqual(expected);
  });
});
