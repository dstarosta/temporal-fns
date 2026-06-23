import { fixtureDates } from './fixtures.js';

export const group10Dates: Date[] = [
  ...fixtureDates,
  new Date(2026, 5, 20, 10, 0, 0), // Saturday
  new Date(2026, 5, 21, 10, 0, 0), // Sunday
  new Date(2026, 1, 28, 12, 0, 0), // non-leap Feb end
  new Date(2026, 2, 1, 10, 0, 0), // first of month
  new Date(2029, 11, 31, 10, 0, 0), // decade boundary (end)
  new Date(2030, 0, 1, 10, 0, 0), // decade boundary (start)
  new Date(2026, 8, 30, 10, 0, 0), // quarter boundary
];
