import { type WorkingFields } from './setters.js';

// No explicit offset/timestamp token: date-fns treats the parsed wall-clock
// fields as being in the SYSTEM's local time zone (verified directly against
// real date-fns: `parse('2020-06-15 10:00:00', 'yyyy-MM-dd HH:mm:ss', ref)`
// produces a Date whose UTC value reflects the system's local offset, not
// UTC) — mirrored here via the local-time `Date` constructor, exactly like
// parseISOValue's own no-offset branch.
//
// With an explicit X/x offset token: the wall-clock fields are treated as a
// UTC-equivalent timestamp, then shifted by the parsed offset. The numeric.ts
// port of date-fns' parseTimezonePattern uses date-fns' OWN sign convention
// (`+02:00` -> +7,200,000 ms), matching ISOTimezoneWithZParser's real
// `set()` body (`date.getTime() - localOffsetMs - value`) — since there's no
// "local offset" term here (fields were never local-tagged), the explicit
// offset is simply subtracted from the UTC-equivalent timestamp.
// `new Date(year, ...)` and `Date.UTC(year, ...)` both special-case a
// 0-99 year argument as 1900+year (e.g. `new Date(50, 0, 1)` means 1950, not
// year 50) — wrong here, since `fields.year` is already a real, fully
// resolved calendar year. `setFullYear`/`setUTCFullYear` have no such
// special case, exactly why parseISOValue uses the same `new Date(0)` +
// `.setFullYear(...)` pattern instead of the constructor directly.
function utcTimestampFor(fields: WorkingFields): number {
  const result = new Date(0);
  result.setUTCFullYear(fields.year, fields.month - 1, fields.day);
  result.setUTCHours(fields.hour, fields.minute, fields.second, fields.millisecond);
  return result.getTime();
}

export function assembleDate(fields: WorkingFields): Date {
  if (fields.epochMilliseconds !== undefined) {
    return new Date(fields.epochMilliseconds);
  }

  if (fields.offsetMinutes !== undefined) {
    return new Date(utcTimestampFor(fields) - fields.offsetMinutes * 60_000);
  }

  const result = new Date(0);
  result.setFullYear(fields.year, fields.month - 1, fields.day);
  result.setHours(fields.hour, fields.minute, fields.second, fields.millisecond);
  return result;
}

// Parity with parseISOPlainDateTime: any parsed offset/timestamp is
// discarded entirely for the PlainDateTime/PlainDate results, since plain
// Temporal types carry no time zone to apply it to.
export function assemblePlainDateTime(fields: WorkingFields): Temporal.PlainDateTime {
  return Temporal.PlainDateTime.from({
    year: fields.year,
    month: fields.month,
    day: fields.day,
    hour: fields.hour,
    minute: fields.minute,
    second: fields.second,
    millisecond: fields.millisecond,
  });
}

export function assemblePlainDate(fields: WorkingFields): Temporal.PlainDate {
  return assemblePlainDateTime(fields).toPlainDate();
}

export function assembleZonedDateTime(
  fields: WorkingFields,
  timeZone: string
): Temporal.ZonedDateTime {
  if (fields.epochMilliseconds !== undefined) {
    return Temporal.Instant.fromEpochMilliseconds(fields.epochMilliseconds).toZonedDateTimeISO(
      timeZone
    );
  }

  if (fields.offsetMinutes !== undefined) {
    const instant = Temporal.Instant.fromEpochMilliseconds(
      utcTimestampFor(fields) - fields.offsetMinutes * 60_000
    );
    return instant.toZonedDateTimeISO(timeZone);
  }

  return assemblePlainDateTime(fields).toZonedDateTime(timeZone);
}
