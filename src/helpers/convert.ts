export function dateToPlainDateTime(date: Date): Temporal.PlainDateTime {
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

export function plainDateTimeToDate(dateTime: Temporal.PlainDateTime): Date {
  return new Date(
    dateTime.year,
    dateTime.month - 1,
    dateTime.day,
    dateTime.hour,
    dateTime.minute,
    dateTime.second,
    dateTime.millisecond
  );
}

export function withDate(
  date: Date,
  op: (dateTime: Temporal.PlainDateTime) => Temporal.PlainDateTime
): Date {
  return plainDateTimeToDate(op(dateToPlainDateTime(date)));
}
