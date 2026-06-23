import { describe, expect, it } from 'vitest';
import { set as dateFnsSet } from 'date-fns';
import { set } from '../src/set.js';
import { fixtureDates, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';

const valueSets = [
  { year: 2030, month: 1 }, // Jan 31 -> Feb clamp case for fixtures that hit it
  { date: 15 },
  { hours: 5, minutes: 10, seconds: 20, milliseconds: 30 },
  { hours: 5 },
  { minutes: 10 },
  { seconds: 20 },
  { milliseconds: 30 },
  {},
  { year: 2024, month: 1, date: 29 }, // leap day target
];

describe('set', () => {
  for (const values of valueSets) {
    it.each(fixtureDates)(
      `matches date-fns for Date input, values=${JSON.stringify(values)} (%s)`,
      (date) => {
        expect(set(date, values).toString()).toBe(dateFnsSet(date, values).toString());
      }
    );

    it.each(fixtureDates)(
      `matches date-fns for PlainDateTime input, values=${JSON.stringify(values)} (%s)`,
      (date) => {
        const expected = dateFnsSet(date, values);
        expect(set(toPlainDateTime(date), values).toString()).toBe(
          toPlainDateTime(expected).toString()
        );
      }
    );

    it.each(fixtureDates)(
      `matches date-fns for ZonedDateTime input, values=${JSON.stringify(values)} (%s)`,
      (date) => {
        const expected = dateFnsSet(date, values);
        expect(set(toZonedDateTime(date), values).toString()).toBe(
          toZonedDateTime(expected).toString()
        );
      }
    );
  }

  it('works on PlainDate for date-only fields', () => {
    const pd = Temporal.PlainDate.from('2026-01-31');
    expect(set(pd, { year: 2030, month: 1 }).toString()).toBe('2030-02-28');
  });

  it('throws when setting a time field on PlainDate', () => {
    const pd = Temporal.PlainDate.from('2026-06-19');
    expect(() => set(pd, { hours: 5 })).toThrow(TypeError);
  });

  it('leaves the date unchanged when values is empty', () => {
    const pd = Temporal.PlainDate.from('2026-06-19');
    expect(set(pd, {})).toBe(pd);
  });
});
