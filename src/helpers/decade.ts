// date-fns defines decades as floor(year / 10) * 10 to floor(year / 10) * 10 + 9
// (e.g. 2000-2009), not the "technically correct" 2001-2010 — matching that
// definition exactly, including its quirk, for full compatibility.
export function decadeStartYear(year: number): number {
  return Math.floor(year / 10) * 10;
}

export function decadeEndYear(year: number): number {
  return decadeStartYear(year) + 9;
}
