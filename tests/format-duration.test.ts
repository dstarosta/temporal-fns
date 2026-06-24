import { describe, expect, it } from 'vitest';
import { formatDuration as dateFnsFormatDuration } from 'date-fns';
import { ru, es, fr, ja, ar } from 'date-fns/locale';
import { formatDuration } from '../src/format-duration.js';

// Whitespace is normalized (nbsp -> regular space) before comparing in some assertions below:
// Intl.NumberFormat correctly inserts a non-breaking space (U+00A0, via an explicit escape -
// never a literal nbsp character in source, which would be invisible and easy to corrupt) before
// certain short French unit words for singular counts (e.g. '1 an'), where date-fns' own French
// locale data always uses a plain space. Neither is wrong - it's a real, narrow
// whitespace-character difference, not a wording difference.
function normalizeSpaces(value: string): string {
  return value.replace(/\u00A0/gu, ' ');
}

describe('formatDuration', () => {
  it('matches date-fns for a full duration', () => {
    const duration = { years: 2, months: 9, weeks: 1, days: 7, hours: 5, minutes: 9, seconds: 30 };
    expect(formatDuration(duration)).toBe(dateFnsFormatDuration(duration));
  });

  it('matches date-fns for a partial duration', () => {
    const duration = { months: 9, days: 2 };
    expect(formatDuration(duration)).toBe(dateFnsFormatDuration(duration));
  });

  it('matches date-fns for a custom format', () => {
    const duration = { years: 2, months: 9, weeks: 1, days: 7, hours: 5, minutes: 9, seconds: 30 };
    const format = ['months', 'weeks'] as const;
    expect(formatDuration(duration, { format: [...format] })).toBe(
      dateFnsFormatDuration(duration, { format: [...format] })
    );
  });

  it('matches date-fns for the zero option', () => {
    const duration = { years: 0, months: 9 };
    expect(formatDuration(duration, { zero: true })).toBe(
      dateFnsFormatDuration(duration, { zero: true })
    );
  });

  it('matches date-fns without the zero option', () => {
    const duration = { years: 0, months: 9 };
    expect(formatDuration(duration)).toBe(dateFnsFormatDuration(duration));
  });

  it('matches date-fns for a custom delimiter', () => {
    const duration = { years: 2, months: 9, weeks: 3 };
    expect(formatDuration(duration, { delimiter: ', ' })).toBe(
      dateFnsFormatDuration(duration, { delimiter: ', ' })
    );
  });

  it('matches date-fns for singular values', () => {
    const duration = { years: 1, months: 1, weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1 };
    expect(formatDuration(duration)).toBe(dateFnsFormatDuration(duration));
  });

  it('matches date-fns for an empty duration', () => {
    expect(formatDuration({})).toBe(dateFnsFormatDuration({}));
  });

  // Previously, formatDuration had no locale option at all and always rendered English unit
  // names. It's fixed via Intl.NumberFormat's `unit` style, which natively handles irregular
  // plural systems (Russian's 1 / 2-4 / 5+ three-way split) with zero bundled locale data.
  describe('locale option', () => {
    it('matches real date-fns for Russian, including its irregular 1/2-4/5+ plural split', () => {
      expect(formatDuration({ years: 1 }, { locale: 'ru' })).toBe(
        dateFnsFormatDuration({ years: 1 }, { locale: ru })
      );
      expect(formatDuration({ years: 2, months: 3 }, { locale: 'ru' })).toBe(
        dateFnsFormatDuration({ years: 2, months: 3 }, { locale: ru })
      );
      expect(formatDuration({ years: 5 }, { locale: 'ru' })).toBe(
        dateFnsFormatDuration({ years: 5 }, { locale: ru })
      );
      expect(formatDuration({ years: 21 }, { locale: 'ru' })).toBe(
        dateFnsFormatDuration({ years: 21 }, { locale: ru })
      );
    });

    it('matches real date-fns for Spanish and French (whitespace-normalized)', () => {
      const duration = { years: 2, months: 9, weeks: 1 };
      expect(normalizeSpaces(formatDuration(duration, { locale: 'es' }))).toBe(
        normalizeSpaces(dateFnsFormatDuration(duration, { locale: es }))
      );
      expect(normalizeSpaces(formatDuration(duration, { locale: 'fr' }))).toBe(
        normalizeSpaces(dateFnsFormatDuration(duration, { locale: fr }))
      );
    });

    it('diverges from date-fns for Japanese: Intl inserts a space date-fns omits', () => {
      // date-fns' Japanese locale data omits the space entirely ('2年'), the idiomatic CJK
      // convention; Intl.NumberFormat's unit style inserts one ('2 年'). Both are understandable
      // Japanese, verified directly rather than assumed.
      const duration = { years: 2, months: 9, weeks: 1 };
      expect(dateFnsFormatDuration(duration, { locale: ja })).toBe('2年 9か月 1週間');
      expect(formatDuration(duration, { locale: 'ja' })).toBe('2 年 9 か月 1 週間');
    });

    it('diverges from date-fns for Arabic singular: Intl omits the explicit "one" word', () => {
      // Both are valid Arabic - Intl's bare singular noun ('سنة') vs date-fns' more explicit
      // 'سنة واحد' ('one year'). Verified date-fns' own behavior directly rather than asserting
      // it from memory.
      expect(dateFnsFormatDuration({ years: 1 }, { locale: ar })).toBe('سنة واحد');
      expect(formatDuration({ years: 1 }, { locale: 'ar' })).toBe('سنة');

      // The 5+ plural form (no implicit-singular ambiguity) does match.
      expect(formatDuration({ years: 5 }, { locale: 'ar' })).toBe(
        dateFnsFormatDuration({ years: 5 }, { locale: ar })
      );
    });

    it('does not change output when no locale is given (default stays English)', () => {
      const duration = {
        years: 2,
        months: 9,
        weeks: 1,
        days: 7,
        hours: 5,
        minutes: 9,
        seconds: 30,
      };
      expect(formatDuration(duration)).toBe(dateFnsFormatDuration(duration));
    });
  });
});
