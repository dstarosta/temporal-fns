import { type DateTimeFields } from './format-fields.js';

function compareFields(a: DateTimeFields, b: DateTimeFields): number {
  const diff =
    a.year - b.year ||
    a.month - b.month ||
    a.day - b.day ||
    a.hour - b.hour ||
    a.minute - b.minute ||
    a.second - b.second ||
    a.millisecond - b.millisecond;
  if (diff < 0) {
    return -1;
  }
  if (diff > 0) {
    return 1;
  }
  return 0;
}

type YearMonthDay = Pick<DateTimeFields, 'year' | 'month' | 'day'>;

function calendarDate(fields: YearMonthDay): Temporal.PlainDate {
  return Temporal.PlainDate.from({ year: fields.year, month: fields.month, day: fields.day });
}

function daysInMonth(year: number, month: number): number {
  return Temporal.PlainDate.from({ year, month, day: 1 }).daysInMonth;
}

// Ports date-fns' differenceInCalendarDays: whole calendar-day difference,
// ignoring time-of-day.
export function differenceInCalendarDaysFields(a: YearMonthDay, b: YearMonthDay): number {
  return calendarDate(a).since(calendarDate(b), { largestUnit: 'days' }).days;
}

// Ports date-fns' differenceInDays "full day" logic: a calendar-day
// difference only counts as full if the later value's time-of-day is not
// earlier than the earlier value's time-of-day.
export function differenceInDaysFields(later: DateTimeFields, earlier: DateTimeFields): number {
  const sign = compareFields(later, earlier);
  if (sign === 0) {
    return 0;
  }

  const calendarDifference = Math.abs(differenceInCalendarDaysFields(later, earlier));
  const shiftedLaterDate = calendarDate(later).subtract({ days: sign * calendarDifference });
  const shiftedLater: DateTimeFields = { ...later, ...fieldsFromPlainDate(shiftedLaterDate) };

  const isLastDayNotFull = compareFields(shiftedLater, earlier) === -sign;

  const result = sign * (calendarDifference - (isLastDayNotFull ? 1 : 0));
  return result === 0 ? 0 : result;
}

function fieldsFromPlainDate(
  date: Temporal.PlainDate
): Pick<DateTimeFields, 'year' | 'month' | 'day'> {
  return { year: date.year, month: date.month, day: date.day };
}

export function differenceInMonthsFields(later: DateTimeFields, earlier: DateTimeFields): number {
  const sign = compareFields(later, earlier);
  if (sign === 0) {
    return 0;
  }

  const calendarMonthsDifference = (later.year - earlier.year) * 12 + (later.month - earlier.month);
  const difference = Math.abs(calendarMonthsDifference);

  if (difference < 1) {
    return 0;
  }

  // date-fns pre-resolves a late-February "later" value as if its day were
  // bumped to 30 (JS Date#setDate semantics: this overflows immediately,
  // e.g. leap-day Feb 29 -> Mar 1), *then* shifts months from there. This
  // avoids landing back on Feb 29/28 after the month shift.
  const workingLater =
    later.month === 2 && later.day > 27
      ? { ...later, ...fieldsFromPlainDate(calendarDate({ ...later, day: 1 }).add({ days: 29 })) }
      : later;

  const shifted = shiftMonths(workingLater, -sign * difference);
  let isLastMonthNotFull = compareFields(shifted, earlier) === -sign;

  const laterIsLastDayOfMonth = later.day === daysInMonth(later.year, later.month);
  if (laterIsLastDayOfMonth && difference === 1 && sign === 1) {
    isLastMonthNotFull = false;
  }

  const result = sign * (difference - (isLastMonthNotFull ? 1 : 0));
  return result === 0 ? 0 : result;
}

export function differenceInYearsFields(later: DateTimeFields, earlier: DateTimeFields): number {
  const sign = compareFields(later, earlier);
  if (sign === 0) {
    return 0;
  }

  const difference = Math.abs(later.year - earlier.year);

  // Normalize both values to a shared non-leap reference year (matches
  // date-fns' approach of using year 1584) and compare the rest of the
  // fields to determine whether the year span is "full".
  const normalizedLater: DateTimeFields = { ...later, year: 1583 };
  const normalizedEarlier: DateTimeFields = { ...earlier, year: 1583 };
  const isPartial = compareFields(normalizedLater, normalizedEarlier) === -sign;

  const result = sign * (difference - (isPartial ? 1 : 0));
  return result === 0 ? 0 : result;
}

// Mirrors JS Date#setMonth: shifting by N months never clamps an
// out-of-range day, it overflows forward into the following month(s)
// (e.g. Jan 31 shifted by +1 month lands on Mar 3, not Feb 28/29).
function shiftMonths(fields: DateTimeFields, amount: number): DateTimeFields {
  const totalMonths = fields.year * 12 + (fields.month - 1) + amount;
  const year = Math.floor(totalMonths / 12);
  const month = (((totalMonths % 12) + 12) % 12) + 1;
  const firstOfMonth = Temporal.PlainDate.from({ year, month, day: 1 }).add({
    days: fields.day - 1,
  });
  return { ...fields, ...fieldsFromPlainDate(firstOfMonth) };
}
