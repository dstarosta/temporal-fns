//#region src/today-plain-date-time.d.ts
/**
 * @summary Return today's date at midnight as a `Temporal.PlainDateTime`.
 *
 * @description
 * Return today's date at midnight as a `Temporal.PlainDateTime`. Per the UTC rule, since
 * `Temporal.PlainDateTime` has no timezone, "today" is resolved using UTC, not the system's
 * local timezone.
 *
 * @returns Today at midnight UTC, as a `Temporal.PlainDateTime`
 */
declare function todayPlainDateTime(): Temporal.PlainDateTime;
//#endregion
export { todayPlainDateTime };
//# sourceMappingURL=today-plain-date-time.d.ts.map