// Dates chosen to exercise ISO week-year boundary edge cases: a date whose
// local calendar year and ISO week-year disagree (Dec 29 2025 is ISO week-year
// 2026; Jan 1 2027 is ISO week-year 2026), plus a 53-ISO-week year (2026).
export const isoWeekDates: Date[] = [
  new Date(2025, 11, 29, 10, 0, 0),
  new Date(2026, 0, 1, 10, 0, 0),
  new Date(2026, 5, 19, 14, 32, 10, 250),
  new Date(2026, 11, 31, 10, 0, 0),
  new Date(2027, 0, 1, 10, 0, 0),
  new Date(2030, 0, 5, 10, 0, 0),
];
