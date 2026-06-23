// Mon Jun 15, 2026 is a clean Monday anchor for business-day arithmetic tests.
export const businessDayDates: Date[] = [
  new Date(2026, 5, 15, 10, 0, 0), // Monday
  new Date(2026, 5, 17, 10, 0, 0), // Wednesday
  new Date(2026, 5, 19, 10, 0, 0), // Friday
  new Date(2026, 5, 20, 10, 0, 0), // Saturday
  new Date(2026, 5, 21, 10, 0, 0), // Sunday
];

export const businessDayAmounts = [0, 1, 4, 5, 6, 10, -1, -4, -5, -6, -10];
