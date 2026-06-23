// Fixed reference instant for all Group 8 "now"-relative tests: mid-Q2 2026.
export const group8Now: Date = new Date(2026, 5, 15, 10, 30, 45, 250);

export const group8SubDayDates: Date[] = [
  new Date(2026, 5, 15, 10, 30, 45, 250), // exactly now
  new Date(2026, 5, 15, 10, 30, 45, 0), // same second, ms differs
  new Date(2026, 5, 15, 10, 30, 0, 0), // same minute, second differs
  new Date(2026, 5, 15, 10, 0, 0, 0), // same hour, minute differs
  new Date(2026, 5, 15, 9, 30, 45, 250), // different hour
  new Date(2026, 5, 15, 10, 29, 45, 250), // different minute
  new Date(2026, 5, 15, 10, 30, 44, 250), // different second
];

export const group8Dates: Date[] = [
  new Date(2026, 5, 15, 10, 30, 45, 250), // exactly now
  new Date(2026, 5, 15, 3, 0, 0, 0), // today, different time
  new Date(2026, 5, 16, 3, 0, 0, 0), // tomorrow
  new Date(2026, 5, 14, 3, 0, 0, 0), // yesterday
  new Date(2026, 5, 1, 0, 0, 0, 0), // this month, different week
  new Date(2026, 4, 31, 23, 59, 59, 999), // last month
  new Date(2026, 8, 1, 0, 0, 0, 0), // next quarter
  new Date(2026, 0, 1, 0, 0, 0, 0), // this year, Q1
  new Date(2025, 5, 15, 10, 30, 45, 250), // last year, same day/time
  new Date(2027, 5, 15, 10, 30, 45, 250), // next year, same day/time
  new Date(2020, 0, 1), // distant past
  new Date(2030, 0, 1), // distant future
];
