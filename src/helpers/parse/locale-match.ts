import { dayPeriodsByWidth, quarterNames } from '../format-formatters.js';
import { getWordPart } from '../intl-words.js';

export type NameWidth = 'narrow' | 'abbreviated' | 'wide';
// Intl.DateTimeFormat's own width vocabulary for month/weekday/era options
// (distinct from NameWidth's date-fns-style 'abbreviated'/'wide' naming).
type IntlNameWidth = 'narrow' | 'short' | 'long';

interface NameCandidate<T> {
  name: string;
  value: T;
}

// temporal-fns has no bundled per-locale name tables (unlike date-fns' static
// regex-based locale/_lib/match.js files) — every locale-dependent candidate
// string is generated on demand via Intl.DateTimeFormat, by formatting known
// reference values (months 1-12, a Monday-starting week, etc) in the
// requested locale and reading back the rendered word. This means any locale
// the runtime's Intl supports "just works" without bundling data for it.
function monthCandidates(width: IntlNameWidth, locale: Intl.LocalesArgument) {
  const candidates: NameCandidate<number>[] = [];
  for (let month = 1; month <= 12; month++) {
    const name = getWordPart(
      Temporal.PlainDate.from({ year: 2024, month, day: 1 }),
      locale,
      { month: width },
      'month'
    );
    candidates.push({ name, value: month });
  }
  return candidates;
}

function weekdayCandidates(width: IntlNameWidth, locale: Intl.LocalesArgument) {
  const candidates: NameCandidate<number>[] = [];
  // 2024-01-01 is a Monday (ISO dayOfWeek 1); loop 1..7 to cover every ISO weekday.
  for (let isoDayOfWeek = 1; isoDayOfWeek <= 7; isoDayOfWeek++) {
    const date = Temporal.PlainDate.from({ year: 2024, month: 1, day: isoDayOfWeek });
    const name = getWordPart(date, locale, { weekday: width }, 'weekday');
    candidates.push({ name, value: isoDayOfWeek });
  }
  return candidates;
}

// date-fns' own 2-letter weekday width (its "short", e.g. "Su"/"Mo"/"Tu") has
// no Intl.DateTimeFormat equivalent — same conclusion format-formatters.ts's
// shortWeekday() already reached for the format direction, derived there by
// slicing the Intl 3-letter abbreviated form down to 2 characters. Mirrored
// here for the parse direction.
function twoLetterWeekdayCandidates(locale: Intl.LocalesArgument) {
  const candidates: NameCandidate<number>[] = [];
  for (let isoDayOfWeek = 1; isoDayOfWeek <= 7; isoDayOfWeek++) {
    const date = Temporal.PlainDate.from({ year: 2024, month: 1, day: isoDayOfWeek });
    const name = getWordPart(date, locale, { weekday: 'short' }, 'weekday').slice(0, 2);
    candidates.push({ name, value: isoDayOfWeek });
  }
  return candidates;
}

function eraCandidates(width: IntlNameWidth, locale: Intl.LocalesArgument) {
  const ad = getWordPart(
    Temporal.PlainDate.from({ year: 2024, month: 1, day: 1 }),
    locale,
    { era: width, year: 'numeric' },
    'era'
  );
  const bc = getWordPart(
    Temporal.PlainDate.from({ year: -1, month: 1, day: 1 }),
    locale,
    { era: width, year: 'numeric' },
    'era'
  );
  return [
    { name: ad, value: 1 },
    { name: bc, value: 0 },
  ];
}

// No Intl.DateTimeFormat option exists for quarter names at all (verified:
// same conclusion format-formatters.ts already reached for the format
// direction) — quarterNames is hardcoded en-US data shared with format's
// quarterToken(), not Intl-generated.
function quarterCandidates(width: keyof typeof quarterNames) {
  return quarterNames[width].map((name, index) => ({ name, value: index + 1 }));
}

// Plain AM/PM (`a` token) is Intl-generated (correct in any locale); the
// noon/midnight/flexible-period vocabulary (`b`/`B`) has no Intl option and
// is hardcoded en-US, shared with format-formatters.ts's dayPeriodsByWidth.
function amPmCandidates(locale: Intl.LocalesArgument) {
  const am = getWordPart(
    Temporal.PlainDateTime.from({ year: 2024, month: 1, day: 1, hour: 6 }),
    locale,
    { hour: 'numeric', hour12: true },
    'dayPeriod'
  );
  const pm = getWordPart(
    Temporal.PlainDateTime.from({ year: 2024, month: 1, day: 1, hour: 18 }),
    locale,
    { hour: 'numeric', hour12: true },
    'dayPeriod'
  );
  return [
    { name: am, value: 'am' },
    { name: pm, value: 'pm' },
  ];
}

function dayPeriodCandidates(width: NameWidth) {
  return Object.entries(dayPeriodsByWidth[width]).map(([value, name]) => ({ name, value }));
}

export interface MatchResult<T> {
  value: T;
  rest: string;
}

// Case-insensitive prefix match, longest-candidate-first: unlike date-fns'
// hand-curated, safely-ordered regex alternations, an Intl-generated
// candidate list can't be assumed to already avoid prefix collisions (e.g. a
// hypothetical locale where one weekday name is a prefix of another), so
// candidates are explicitly sorted longest-first before matching.
function matchLongestCandidate<T>(
  input: string,
  candidates: NameCandidate<T>[]
): MatchResult<T> | undefined {
  const lowerInput = input.toLowerCase();
  const sorted = [...candidates].sort((a, b) => b.name.length - a.name.length);
  for (const candidate of sorted) {
    // Defensive: no en-US Intl.DateTimeFormat width/locale combination this
    // project tests against ever produces an empty string, so this is
    // unreachable today — guards against a hypothetical locale where a
    // narrow-width name is empty, which would otherwise match any input.
    /* v8 ignore next 3 */
    if (candidate.name.length === 0) {
      continue;
    }
    if (lowerInput.startsWith(candidate.name.toLowerCase())) {
      return { value: candidate.value, rest: input.slice(candidate.name.length) };
    }
  }
  return undefined;
}

export function matchMonth(
  input: string,
  width: IntlNameWidth,
  locale: Intl.LocalesArgument
): MatchResult<number> | undefined {
  return matchLongestCandidate(input, monthCandidates(width, locale));
}

export function matchWeekday(
  input: string,
  width: IntlNameWidth,
  locale: Intl.LocalesArgument
): MatchResult<number> | undefined {
  return matchLongestCandidate(input, weekdayCandidates(width, locale));
}

export function matchWeekdayTwoLetter(
  input: string,
  locale: Intl.LocalesArgument
): MatchResult<number> | undefined {
  return matchLongestCandidate(input, twoLetterWeekdayCandidates(locale));
}

export function matchEra(
  input: string,
  width: IntlNameWidth,
  locale: Intl.LocalesArgument
): MatchResult<number> | undefined {
  return matchLongestCandidate(input, eraCandidates(width, locale));
}

export function matchQuarter(
  input: string,
  width: keyof typeof quarterNames
): MatchResult<number> | undefined {
  return matchLongestCandidate(input, quarterCandidates(width));
}

export function matchAmPm(
  input: string,
  locale: Intl.LocalesArgument
): MatchResult<'am' | 'pm'> | undefined {
  return matchLongestCandidate(input, amPmCandidates(locale)) as
    | MatchResult<'am' | 'pm'>
    | undefined;
}

export function matchDayPeriod(input: string, width: NameWidth): MatchResult<string> | undefined {
  return matchLongestCandidate(input, dayPeriodCandidates(width));
}

// Ported verbatim from date-fns' matchOrdinalNumberPattern for exact
// behavioral parity; pure regex, no Intl/locale dependency (date-fns' own
// ordinal-suffix vocabulary is en-US-only too, matching this project's
// existing ordinalSuffixes table in format-formatters.ts).
const ordinalNumberRegExp = /^(\d+)(th|st|nd|rd)?/i;

export function matchOrdinalNumber(input: string): MatchResult<number> | undefined {
  const match = ordinalNumberRegExp.exec(input);
  if (!match) {
    return undefined;
  }
  // Capture group 1 is mandatory (\d+, no `?`) in ordinalNumberRegExp, so
  // it's always defined whenever `match` itself matched at all; the
  // fallback only satisfies noUncheckedIndexedAccess.
  /* v8 ignore next */
  return { value: Number.parseInt(match[1] ?? '', 10), rest: input.slice(match[0].length) };
}
