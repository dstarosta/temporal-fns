import { DateLike } from "./types.js";

//#region src/format-relative.d.ts
/**
 * The {@link formatRelative} function options.
 */
interface FormatRelativeOptions {
  locale?: Intl.LocalesArgument;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
/**
 * @summary Represent the date in words relative to the given base date.
 *
 * @description
 * Represent the date in words relative to the given base date, via `Intl.RelativeTimeFormat` —
 * correctly localized for any `options.locale`, not just English. This is a deliberate departure
 * from date-fns' own `formatRelative`: date-fns names the specific weekday and includes a
 * time-of-day (`"last Thursday at 12:45 AM"`), using per-locale `Locale` objects with bundled
 * connector-word data ("last", "at", and so on) for every supported language. There's no
 * `Intl` primitive that provides that same weekday+time composite in an arbitrary locale, so
 * rather than hardcode English connector words and silently produce broken output for every
 * other locale, this resolves to `Intl.RelativeTimeFormat`'s day/week granularity instead, with
 * no time-of-day component, for every locale including English.
 *
 * | Distance to the base date | Result (en)  |
 * |---------------------------|--------------|
 * | Previous 2-6 days         | last week    |
 * | Last day                  | yesterday    |
 * | Same day                  | today        |
 * | Next day                  | tomorrow     |
 * | Next 2-6 days             | next week    |
 * | Other                     | 12/31/2017   |
 *
 * @param date - The date to format
 * @param baseDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The date in words
 *
 * @example
 * // Represent the date of 6 days ago in words relative to the given base date:
 * const result = formatRelative(subDays(new Date(), 6), new Date())
 * //=> "last week"
 *
 * @example
 * // Correctly localized for any locale, unlike date-fns' weekday+time composite:
 * const result = formatRelative(subDays(new Date(), 3), new Date(), { locale: 'es' })
 * //=> "hace 3 días"
 */
declare function formatRelative(date: Date, baseDate: Date, options?: FormatRelativeOptions): string;
/**
 * @summary Represent the date in words relative to the given base date.
 *
 * @description
 * Represent the date in words relative to the given base date, via `Intl.RelativeTimeFormat` —
 * correctly localized for any `options.locale`, not just English. This is a deliberate departure
 * from date-fns' own `formatRelative`: date-fns names the specific weekday and includes a
 * time-of-day (`"last Thursday at 12:45 AM"`), using per-locale `Locale` objects with bundled
 * connector-word data ("last", "at", and so on) for every supported language. There's no
 * `Intl` primitive that provides that same weekday+time composite in an arbitrary locale, so
 * rather than hardcode English connector words and silently produce broken output for every
 * other locale, this resolves to `Intl.RelativeTimeFormat`'s day/week granularity instead, with
 * no time-of-day component, for every locale including English.
 *
 * | Distance to the base date | Result (en)  |
 * |---------------------------|--------------|
 * | Previous 2-6 days         | last week    |
 * | Last day                  | yesterday    |
 * | Same day                  | today        |
 * | Next day                  | tomorrow     |
 * | Next 2-6 days             | next week    |
 * | Other                     | 12/31/2017   |
 *
 * @typeParam T - A {@link DateLike} type (`Temporal.PlainDate`, `Temporal.PlainDateTime` or
 * `Temporal.ZonedDateTime`). Inferred from `date`/`baseDate`, which must share the same
 * concrete type.
 *
 * @param date - The date to format
 * @param baseDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The date in words
 *
 * @example
 * // Represent the date of 6 days ago in words relative to the given base date:
 * const result = formatRelative(subDays(new Date(), 6), new Date())
 * //=> "last week"
 *
 * @example
 * // Correctly localized for any locale, unlike date-fns' weekday+time composite:
 * const result = formatRelative(subDays(new Date(), 3), new Date(), { locale: 'es' })
 * //=> "hace 3 días"
 */
declare function formatRelative<T extends DateLike>(date: T, baseDate: T, options?: FormatRelativeOptions): string;
//#endregion
export { FormatRelativeOptions, formatRelative };
//# sourceMappingURL=format-relative.d.ts.map