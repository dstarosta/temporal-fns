import { describe, expect, it } from 'vitest';
import { setYear as dateFnsSetYear } from 'date-fns';
import { setYear } from '../src/set-year.js';
import { fixtureDates, toPlainDate, toPlainDateTime, toZonedDateTime } from './helpers/fixtures.js';
import { testDateUnitFn } from './helpers/test-date-unit-fn.js';

// 2030 is not a leap year: setYear into 2030 from the Feb 29 fixture is a deliberate divergence
// from date-fns (see below), so it's excluded from the generic parity check here.
const nonLeapTargetDates = fixtureDates.filter(
  (date) => !(date.getMonth() === 1 && date.getDate() === 29)
);

describe('setYear', () => {
  testDateUnitFn(setYear, dateFnsSetYear, 2030, nonLeapTargetDates);
  testDateUnitFn(setYear, dateFnsSetYear, 2028, fixtureDates); // leap year target, no divergence
});

describe('setYear: deliberate divergence from date-fns for Feb 29 into a non-leap year', () => {
  // Real date-fns (via Date#setFullYear) overflows into the next month when the day doesn't
  // exist in the target year: setYear(Feb 29 2024, 2030) -> Mar 1 2030. temporal-fns clamps to
  // the target month's last valid day instead (Feb 28 2030), the same way setMonth already does.
  const leapDayDate = new Date(2024, 1, 29, 12, 0, 0);

  it('date-fns overflows into March', () => {
    expect(dateFnsSetYear(leapDayDate, 2030).toString()).toBe(
      new Date(2030, 2, 1, 12, 0, 0).toString()
    );
  });

  it('temporal-fns clamps to Feb 28, for Date input', () => {
    expect(setYear(leapDayDate, 2030).toString()).toBe(new Date(2030, 1, 28, 12, 0, 0).toString());
  });

  it('temporal-fns clamps to Feb 28, for PlainDate input', () => {
    expect(setYear(toPlainDate(leapDayDate), 2030).toString()).toBe('2030-02-28');
  });

  it('temporal-fns clamps to Feb 28, for PlainDateTime input', () => {
    expect(setYear(toPlainDateTime(leapDayDate), 2030).toString()).toBe('2030-02-28T12:00:00');
  });

  it('temporal-fns clamps to Feb 28, for ZonedDateTime input', () => {
    const result = setYear(toZonedDateTime(leapDayDate), 2030);
    expect(result.toPlainDate().toString()).toBe('2030-02-28');
    expect(result.hour).toBe(12);
  });

  it('still overflows correctly into a leap year target (Feb 29 is valid)', () => {
    expect(setYear(leapDayDate, 2028).toString()).toBe(
      dateFnsSetYear(leapDayDate, 2028).toString()
    );
  });
});
