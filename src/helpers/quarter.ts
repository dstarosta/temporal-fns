export function quarterStartMonth(month: number): number {
  return month - ((month - 1) % 3);
}

export function quarterEndMonth(month: number): number {
  return quarterStartMonth(month) + 2;
}
