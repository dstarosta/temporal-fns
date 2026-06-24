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

// { year: 2030, month: 1 } applied to the Feb 29 2024 fixture is a deliberate divergence (see
// below): date-fns' setYear overflow bug happens to cancel out into Feb 1 2030 here, whereas
// temporal-fns' clamped setYear correctly produces Feb 28 2030. Excluded from the generic parity
// loop for that one value set; covered explicitly instead.
function datesFor(values: (typeof valueSets)[number]): Date[] {
  if (values.year === 2030 && values.month === 1) {
    return fixtureDates.filter((date) => !(date.getMonth() === 1 && date.getDate() === 29));
  }
  return fixtureDates;
}

describe('set', () => {
  for (const values of valueSets) {
    it.each(datesFor(values))(
      `matches date-fns for Date input, values=${JSON.stringify(values)} (%s)`,
      (date) => {
        expect(set(date, values).toString()).toBe(dateFnsSet(date, values).toString());
      }
    );

    it.each(datesFor(values))(
      `matches date-fns for PlainDateTime input, values=${JSON.stringify(values)} (%s)`,
      (date) => {
        const expected = dateFnsSet(date, values);
        expect(set(toPlainDateTime(date), values).toString()).toBe(
          toPlainDateTime(expected).toString()
        );
      }
    );

    it.each(datesFor(values))(
      `matches date-fns for ZonedDateTime input, values=${JSON.stringify(values)} (%s)`,
      (date) => {
        const expected = dateFnsSet(date, values);
        expect(set(toZonedDateTime(date), values).toString()).toBe(
          toZonedDateTime(expected).toString()
        );
      }
    );
  }

  it('deliberately diverges from date-fns when year+month land on Feb 29 of a non-leap year', () => {
    const leapDayDate = new Date(2024, 1, 29, 12, 0, 0);
    const values = { year: 2030, month: 1 };

    // date-fns: setYear overflows Feb 29 2024 -> Mar 1 2030, then setMonth clamps it back to
    // Feb 1 2030 - the "right-looking" result is two bugs cancelling out, not a correct step.
    expect(dateFnsSet(leapDayDate, values).toString()).toBe(
      new Date(2030, 1, 1, 12, 0, 0).toString()
    );

    // temporal-fns: setYear clamps directly to Feb 28 2030, then setMonth is a no-op.
    expect(set(leapDayDate, values).toString()).toBe(new Date(2030, 1, 28, 12, 0, 0).toString());
  });

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
