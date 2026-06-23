import { UTCDate } from '@date-fns/utc';

export const fixtureDates: Date[] = [
  new Date(2026, 0, 1, 0, 0, 0, 0),
  new Date(2026, 5, 19, 14, 32, 10, 250),
  new Date(2026, 11, 31, 23, 59, 59, 999),
  new Date(2024, 1, 29, 12, 0, 0, 0), // leap day
  new Date(2026, 2, 31, 6, 15, 0, 0), // end of March
];

export function toPlainDate(date: Date): Temporal.PlainDate {
  return Temporal.PlainDate.from({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
}

export function toPlainDateTime(date: Date): Temporal.PlainDateTime {
  return Temporal.PlainDateTime.from({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    millisecond: date.getMilliseconds(),
  });
}

// Defaults to the system's local IANA timezone, matching how `Date` and
// date-fns implicitly interpret wall-clock fields — this keeps DST-crossing
// comparisons meaningful (UTC has no DST, so it would hide DST bugs).
export function toZonedDateTime(
  date: Date,
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
): Temporal.ZonedDateTime {
  return toPlainDateTime(date).toZonedDateTime(timeZone);
}

// Temporal.PlainDate/PlainDateTime carry no timezone, so temporal-fns treats
// their fields as UTC. The matching date-fns comparison target is `UTCDate`
// (from @date-fns/utc) constructed with the *same wall-clock numbers* the
// fixture's local fields show — i.e. "this date's numbers, read as UTC".
export function toUTCDate(date: Date): UTCDate {
  return new UTCDate(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  );
}

// Same as toUTCDate, but zeroes the time-of-day — the correct date-fns+UTCDate
// comparison target for a Temporal.PlainDate input, which has no time
// component at all (unlike UTCDate, which always has one, defaulting it to
// midnight would otherwise silently keep the original wall-clock time).
export function toMidnightUTCDate(date: Date): UTCDate {
  return new UTCDate(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

// Reads any Date's *UTC* fields into a PlainDateTime — used to read back a
// `UTCDate`-based date-fns result (or any Date, by its UTC fields) as the
// Temporal.PlainDateTime that temporal-fns is expected to produce.
export function utcFieldsToPlainDateTime(date: Date): Temporal.PlainDateTime {
  return Temporal.PlainDateTime.from({
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds(),
    millisecond: date.getUTCMilliseconds(),
  });
}
