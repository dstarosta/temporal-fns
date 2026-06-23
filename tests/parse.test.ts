import { describe, expect, it, vi } from 'vitest';
import { parse as dfParse } from 'date-fns';
import { parse } from '../src/parse.js';

describe('parse: Date overload (matches date-fns)', () => {
  const referenceDate = new Date(2020, 0, 1);
  const cases: {
    dateStr: string;
    formatStr: string;
    options?: { useAdditionalDayOfYearTokens?: boolean; useAdditionalWeekYearTokens?: boolean };
  }[] = [
    { dateStr: '02/11/2014', formatStr: 'MM/dd/yyyy' },
    { dateStr: '2014-02-11', formatStr: 'yyyy-MM-dd' },
    { dateStr: '2014-02-11T11:30:30', formatStr: "yyyy-MM-dd'T'HH:mm:ss" },
    { dateStr: 'Feb 11th, 2014', formatStr: "MMM do',' yyyy" },
    { dateStr: 'February 11 2014', formatStr: 'MMMM dd yyyy' },
    { dateStr: 'Tuesday, February 11 2014', formatStr: 'EEEE, MMMM dd yyyy' },
    { dateStr: '11 Feb 14', formatStr: 'dd MMM yy' },
    { dateStr: "3 o'clock", formatStr: "h 'o''clock'" },
    { dateStr: '11:30 PM', formatStr: 'h:mm a' },
    { dateStr: '23:30', formatStr: 'HH:mm' },
    { dateStr: '11:30 in the morning', formatStr: 'h:mm B' },
    { dateStr: 'Q1 2014', formatStr: "'Q'Q yyyy" },
    { dateStr: '1st quarter 2014', formatStr: 'QQQQ yyyy' },
    { dateStr: 'AD 2014', formatStr: 'GGGG yyyy' },
    {
      dateStr: '2014, day 45',
      formatStr: "yyyy',' 'day' D",
      options: { useAdditionalDayOfYearTokens: true },
    },
    { dateStr: '512969520', formatStr: 't' },
    { dateStr: '512969520900', formatStr: 'T' },
    { dateStr: '2020-06-15 10:00:00 +02:00', formatStr: 'yyyy-MM-dd HH:mm:ss XXX' },
    { dateStr: '2020-06-15 10:00:00', formatStr: 'yyyy-MM-dd HH:mm:ss' },
    { dateStr: '2020-06-15T10:00:00.123', formatStr: "yyyy-MM-dd'T'HH:mm:ss.SSS" },
    { dateStr: '50', formatStr: 'yy' },
    { dateStr: '75', formatStr: 'yy' },
    { dateStr: '50', formatStr: 'uu' },
    { dateStr: '02/11/2014', formatStr: 'MM/dd/yy' },
    { dateStr: 'garbage', formatStr: 'MM/dd/yyyy' },
    { dateStr: '', formatStr: 'MM/dd/yyyy' },
    { dateStr: '02/11/2014 extra', formatStr: 'MM/dd/yyyy' },
    { dateStr: 'January 1st', formatStr: 'MMMM do' },
    { dateStr: '2020-01-01', formatStr: '' },
    { dateStr: '', formatStr: '' },
    { dateStr: '2014-W07-2', formatStr: "RRRR-'W'II-i" },
    { dateStr: '2014', formatStr: 'R' },
    {
      dateStr: '2014, week 7',
      formatStr: "YYYY',' 'week' ww",
      options: { useAdditionalWeekYearTokens: true },
    },
    // Width/variant coverage for every numeric and ordinal token form.
    { dateStr: '2014', formatStr: 'Yo' },
    { dateStr: 'M', formatStr: 'MMMMM' },
    { dateStr: '2', formatStr: 'M' },
    { dateStr: '2nd', formatStr: 'Mo' },
    { dateStr: 'F', formatStr: 'LLLLL' },
    { dateStr: '7', formatStr: 'w' },
    { dateStr: '7th', formatStr: 'wo' },
    { dateStr: '07', formatStr: 'II' },
    { dateStr: '7th', formatStr: 'Io' },
    { dateStr: '11', formatStr: 'd' },
    { dateStr: '11th', formatStr: 'do' },
    { dateStr: '45th', formatStr: 'Do', options: { useAdditionalDayOfYearTokens: true } },
    { dateStr: 'Tu', formatStr: 'eeeeee' },
    { dateStr: '3rd', formatStr: 'eo' },
    { dateStr: 'Tu', formatStr: 'cccccc' },
    { dateStr: '3rd', formatStr: 'co' },
    { dateStr: '3rd', formatStr: 'io' },
    { dateStr: '4', formatStr: 'q' },
    { dateStr: '4', formatStr: 'QQQQQ' },
    { dateStr: 'A', formatStr: 'GGGGG' },
    { dateStr: 'noon', formatStr: 'h:mm bbbb' },
    { dateStr: '5:00 a', formatStr: 'h:mm aaaaa' },
    { dateStr: '5', formatStr: 'ho' },
    { dateStr: '13', formatStr: 'HH' },
    { dateStr: '13th', formatStr: 'Ho' },
    { dateStr: '5', formatStr: 'K' },
    { dateStr: '5th', formatStr: 'Ko' },
    { dateStr: '17', formatStr: 'k' },
    { dateStr: '17th', formatStr: 'ko' },
    { dateStr: '5', formatStr: 'mo' },
    { dateStr: '5', formatStr: 'so' },
    { dateStr: '2020-06-15T10:00:00-0800', formatStr: "yyyy-MM-dd'T'HH:mm:ssxx" },
    { dateStr: '2020-06-15T10:00:00-08', formatStr: "yyyy-MM-dd'T'HH:mm:ssxxxx" },
    { dateStr: '2020-06-15T10:00:00-08:00', formatStr: "yyyy-MM-dd'T'HH:mm:ssxxxxx" },
    { dateStr: '2020-06-15T10:00:00-0800', formatStr: "yyyy-MM-dd'T'HH:mm:ssXX" },
    { dateStr: '2020-06-15T10:00:00-080000', formatStr: "yyyy-MM-dd'T'HH:mm:ssXXXX" },
    { dateStr: '2020-06-15T10:00:00-08', formatStr: "yyyy-MM-dd'T'HH:mm:ssX" },
    { dateStr: '2020-06-15T10:00:00-08:00:00', formatStr: "yyyy-MM-dd'T'HH:mm:ssXXXXX" },
    { dateStr: '03', formatStr: 'ee' },
    { dateStr: '03', formatStr: 'cc' },
    { dateStr: 'Tuesday', formatStr: 'iiii' },
    { dateStr: 'T', formatStr: 'iiiii' },
    { dateStr: 'at night', formatStr: "h:mm 'at night'" },
    { dateStr: 'B', formatStr: 'GGGGG' },
    {
      dateStr: '14, week 7',
      formatStr: "YY',' 'week' ww",
      options: { useAdditionalWeekYearTokens: true },
    },
    // Single-character numeric forms not otherwise covered above.
    { dateStr: '3', formatStr: 'I' },
    { dateStr: '13', formatStr: 'H' },
    { dateStr: '5', formatStr: 'm' },
    { dateStr: '5', formatStr: 's' },
    { dateStr: '3', formatStr: 'e' },
    { dateStr: '3', formatStr: 'c' },
    { dateStr: 'Tue', formatStr: 'E' },
    { dateStr: 'Tue', formatStr: 'EE' },
    { dateStr: '2020-06-15T10:00:00-08:00', formatStr: "yyyy-MM-dd'T'HH:mm:ssXXX" },
    { dateStr: '2020-06-15T10:00:00-08:00', formatStr: "yyyy-MM-dd'T'HH:mm:ssxxx" },
    // 3+ digit numeric forms that fall through to the generic parseNDigits default.
    { dateStr: '007', formatStr: 'www' },
    { dateStr: '007', formatStr: 'III' },
    { dateStr: '011', formatStr: 'ddd' },
    { dateStr: '045', formatStr: 'DDD', options: { useAdditionalDayOfYearTokens: true } },
    { dateStr: '005', formatStr: 'hhh' },
    { dateStr: '013', formatStr: 'HHH' },
    { dateStr: '005', formatStr: 'KKK' },
    { dateStr: '017', formatStr: 'kkk' },
    { dateStr: '005', formatStr: 'mmm' },
    { dateStr: '005', formatStr: 'sss' },
    { dateStr: '2020-06-15T10:00:00-08', formatStr: "yyyy-MM-dd'T'HH:mm:ssx" },
    // BC era (G) combined with y/Y exercises the `flags.era === 0` branch.
    { dateStr: 'BC 5', formatStr: 'GGGG y' },
    {
      dateStr: 'BC 5',
      formatStr: 'GGGG Y',
      options: { useAdditionalWeekYearTokens: true },
    },
    // 3-letter text widths not otherwise covered above.
    { dateStr: 'Tue', formatStr: 'EEE' },
    { dateStr: 'Tue', formatStr: 'eee' },
    { dateStr: 'Tue', formatStr: 'ccc' },
    { dateStr: 'Q3', formatStr: 'QQQ' },
    { dateStr: 'at night', formatStr: 'h:mm BBB' },
    { dateStr: 'AD', formatStr: 'G' },
    { dateStr: '11:30 p.m.', formatStr: 'h:mm aaaa' },
    { dateStr: '3rd', formatStr: 'Qo' },
    { dateStr: '3rd', formatStr: 'qo' },
    // 'mi' only matches the narrow day-period table, not abbreviated —
    // exercises the BBB token's abbreviated->narrow ?? fallback chain.
    { dateStr: '12:00 mi', formatStr: 'h:mm BBB' },
  ];

  it.each(cases)(
    'matches date-fns for $dateStr against $formatStr',
    ({ dateStr, formatStr, options }) => {
      const expected = dfParse(dateStr, formatStr, referenceDate, options);
      const actual = parse(dateStr, formatStr, referenceDate, options);
      if (Number.isNaN(+expected)) {
        expect(Number.isNaN(+actual)).toBe(true);
      } else {
        expect(+actual).toBe(+expected);
      }
    }
  );

  it('throws RangeError for incompatible tokens, matching date-fns', () => {
    expect(() => parse('23 AM', 'HH a', referenceDate)).toThrow(RangeError);
    expect(() => dfParse('23 AM', 'HH a', referenceDate)).toThrow(RangeError);
  });

  it('throws RangeError when a timestamp token is combined with any other token', () => {
    expect(() => parse('512969520 2020', 't yyyy', referenceDate)).toThrow(RangeError);
    expect(() => parse('2020 512969520', 'yyyy t', referenceDate)).toThrow(RangeError);
    expect(() => dfParse('2020 512969520', 'yyyy t', referenceDate)).toThrow(RangeError);
  });

  it('throws RangeError for an unescaped latin character', () => {
    expect(() => parse('foo', 'Z', referenceDate)).toThrow(RangeError);
  });

  it('returns Invalid Date when a literal in the format string is missing from the input', () => {
    const result = parse('2014-02-11', "yyyy'/'MM'/'dd", referenceDate);
    expect(Number.isNaN(+result)).toBe(true);
  });

  it('returns Invalid Date when the day fails range validation for the month, matching date-fns', () => {
    const expected = dfParse('2014-02-31', 'yyyy-MM-dd', referenceDate);
    const actual = parse('2014-02-31', 'yyyy-MM-dd', referenceDate);
    expect(Number.isNaN(+expected)).toBe(true);
    expect(Number.isNaN(+actual)).toBe(true);
  });

  it('returns Invalid Date when an X token fails to match a timezone pattern', () => {
    const expected = dfParse('not-an-offset', 'XXX', referenceDate);
    const actual = parse('not-an-offset', 'XXX', referenceDate);
    expect(Number.isNaN(+expected)).toBe(true);
    expect(Number.isNaN(+actual)).toBe(true);
  });

  it('returns Invalid Date when an ordinal token fails to match any digits', () => {
    const expected = dfParse('abc', 'do', referenceDate);
    const actual = parse('abc', 'do', referenceDate);
    expect(Number.isNaN(+expected)).toBe(true);
    expect(Number.isNaN(+actual)).toBe(true);
  });

  it('matches date-fns for wide (5+ digit) numeric year/extended-year tokens', () => {
    expect(+parse('02014', 'yyyyy', referenceDate)).toBe(+dfParse('02014', 'yyyyy', referenceDate));
    expect(+parse('-02014', 'uuuuu', referenceDate)).toBe(
      +dfParse('-02014', 'uuuuu', referenceDate)
    );
  });

  it('matches date-fns for b/B day-period tokens covering noon/evening hours', () => {
    expect(+parse('12:00 noon', 'h:mm b', referenceDate)).toBe(
      +dfParse('12:00 noon', 'h:mm b', referenceDate)
    );
    expect(+parse('6:00 in the evening', 'h:mm B', referenceDate)).toBe(
      +dfParse('6:00 in the evening', 'h:mm B', referenceDate)
    );
  });

  it('matches date-fns for h/K hour rollover when referenceDate is already in the PM', () => {
    const pmReference = new Date(2020, 0, 1, 18, 0, 0);
    expect(+parse('5', 'h', pmReference)).toBe(+dfParse('5', 'h', pmReference));
    expect(+parse('5', 'K', pmReference)).toBe(+dfParse('5', 'K', pmReference));
  });

  it('matches date-fns century-inference for a two-digit year near an early referenceDate', () => {
    const earlyReference = new Date(0, 0, 1);
    earlyReference.setFullYear(20);
    expect(+parse('25', 'yy', earlyReference)).toBe(+dfParse('25', 'yy', earlyReference));
  });

  it('matches date-fns century-inference for a two-digit year with a BC referenceDate', () => {
    const bcReference = new Date(0, 0, 1);
    bcReference.setFullYear(-5);
    expect(+parse('25', 'yy', bcReference)).toBe(+dfParse('25', 'yy', bcReference));
  });

  it('matches date-fns century-inference for a literal "00" two-digit year near an early referenceDate', () => {
    const earlyReference = new Date(0, 0, 1);
    earlyReference.setFullYear(20);
    expect(+parse('00', 'yy', earlyReference)).toBe(+dfParse('00', 'yy', earlyReference));
  });

  it('matches date-fns for Z (literal zero-offset) with X/x tokens', () => {
    expect(+parse('2020-06-15 10:00:00Z', 'yyyy-MM-dd HH:mm:ssXXX', referenceDate)).toBe(
      +dfParse('2020-06-15 10:00:00Z', 'yyyy-MM-dd HH:mm:ssXXX', referenceDate)
    );
  });

  it('matches date-fns for signed single-digit and three-digit extended-year tokens', () => {
    expect(+parse('-5', 'u', referenceDate)).toBe(+dfParse('-5', 'u', referenceDate));
    expect(+parse('-500', 'uuu', referenceDate)).toBe(+dfParse('-500', 'uuu', referenceDate));
  });

  it('matches date-fns for long localized date/time tokens (P/p aliases)', () => {
    const cases2: string[] = ['P', 'PP', 'PPP', 'PPPP', 'p', 'pp', 'Pp', 'PPpp', 'PPPpp', 'PPPPpp'];
    for (const formatStr of cases2) {
      const expected = dfParse('02/11/2014, 11:30 PM', formatStr, referenceDate);
      const actual = parse('02/11/2014, 11:30 PM', formatStr, referenceDate);
      if (Number.isNaN(+expected)) {
        expect(Number.isNaN(+actual)).toBe(true);
      } else {
        expect(+actual).toBe(+expected);
      }
    }
  });

  it('matches date-fns for a doubled single-quote literal (escaped apostrophe)', () => {
    expect(+parse("3 o'clock", "h 'o''clock'", referenceDate)).toBe(
      +dfParse("3 o'clock", "h 'o''clock'", referenceDate)
    );
  });

  it('matches date-fns for a bare doubled-quote token (literal single quote)', () => {
    expect(+parse("'", "''", referenceDate)).toBe(+dfParse("'", "''", referenceDate));
  });

  it('matches date-fns throwing for long/full localized time widths (ppp/pppp expand to a z token, which neither library can parse)', () => {
    for (const formatStr of ['ppp', 'pppp']) {
      expect(() => parse('11:30:00 PM EST', formatStr, referenceDate)).toThrow(RangeError);
      expect(() => dfParse('11:30:00 PM EST', formatStr, referenceDate)).toThrow(RangeError);
    }
  });

  it('throws RangeError for the protected DD token, matching date-fns', () => {
    expect(() => parse('2014-045', 'yyyy-DD', referenceDate)).toThrow(RangeError);
    expect(() => dfParse('2014-045', 'yyyy-DD', referenceDate)).toThrow(RangeError);
  });

  it('matches date-fns for am/midnight/night day-period tokens', () => {
    expect(+parse('12:00 midnight', 'h:mm b', referenceDate)).toBe(
      +dfParse('12:00 midnight', 'h:mm b', referenceDate)
    );
    expect(+parse('2:00 at night', 'h:mm B', referenceDate)).toBe(
      +dfParse('2:00 at night', 'h:mm B', referenceDate)
    );
  });

  it('warns (without throwing) for the protected bare `Y` token, matching date-fns', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const expected = dfParse('2014', 'Y', referenceDate);
    const actual = parse('2014', 'Y', referenceDate);
    expect(+actual).toBe(+expected);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('returns an invalid Date when referenceDate itself is invalid', () => {
    const result = parse('2020-01-01', 'yyyy-MM-dd', new Date(Number.NaN));
    expect(Number.isNaN(+result)).toBe(true);
  });
});

describe('parse: PlainDate overload', () => {
  it('parses a pure date format string', () => {
    const result = parse('02/11/2014', 'MM/dd/yyyy', new Date(), { in: Temporal.PlainDate });
    expect(result?.toString()).toBe('2014-02-11');
  });

  it('throws TypeError when the format string contains a time-of-day token', () => {
    expect(() =>
      parse('02/11/2014 10:00', 'MM/dd/yyyy HH:mm', new Date(), { in: Temporal.PlainDate })
    ).toThrow(TypeError);
  });

  it('returns undefined for unparseable input', () => {
    const result = parse('garbage', 'MM/dd/yyyy', new Date(), { in: Temporal.PlainDate });
    expect(result).toBeUndefined();
  });

  it('fills missing fields from referenceDate', () => {
    const result = parse('11', 'dd', new Date(2014, 1, 1), { in: Temporal.PlainDate });
    expect(result?.toString()).toBe('2014-02-11');
  });
});

describe('parse: PlainDateTime overload', () => {
  it('parses date and time tokens together', () => {
    const result = parse('2014-02-11 11:30:30', 'yyyy-MM-dd HH:mm:ss', new Date(), {
      in: Temporal.PlainDateTime,
    });
    expect(result?.toString()).toBe('2014-02-11T11:30:30');
  });

  it('ignores an explicit offset token entirely', () => {
    const result = parse('2014-02-11 11:30:30 +05:00', 'yyyy-MM-dd HH:mm:ss XXX', new Date(), {
      in: Temporal.PlainDateTime,
    });
    expect(result?.toString()).toBe('2014-02-11T11:30:30');
  });

  it('returns undefined for unparseable input', () => {
    const result = parse('garbage', 'yyyy-MM-dd', new Date(), { in: Temporal.PlainDateTime });
    expect(result).toBeUndefined();
  });
});

describe('parse: ZonedDateTime overload', () => {
  it('converts via instant when a Unix timestamp token is present', () => {
    const result = parse('512969520', 't', new Date(), {
      in: Temporal.ZonedDateTime,
      timeZone: 'UTC',
    });
    expect(result?.toString()).toBe('1986-04-04T03:32:00+00:00[UTC]');
  });

  it('converts via instant when an explicit offset is present', () => {
    const result = parse('2014-02-11 11:30:30 +00:00', 'yyyy-MM-dd HH:mm:ss XXX', new Date(), {
      in: Temporal.ZonedDateTime,
      timeZone: 'America/New_York',
    });
    expect(result?.toString()).toBe('2014-02-11T06:30:30-05:00[America/New_York]');
  });

  it('attaches wall-clock fields directly to timeZone when no offset is present', () => {
    const result = parse('2014-02-11 11:30:30', 'yyyy-MM-dd HH:mm:ss', new Date(), {
      in: Temporal.ZonedDateTime,
      timeZone: 'America/New_York',
    });
    expect(result?.toString()).toBe('2014-02-11T11:30:30-05:00[America/New_York]');
  });

  it('requires an explicit timeZone option (type-level)', () => {
    // @ts-expect-error timeZone is required for the ZonedDateTime overload
    const result = parse('2014-02-11', 'yyyy-MM-dd', new Date(), {
      in: Temporal.ZonedDateTime,
    });
    expect(result).toBeUndefined();
  });

  it('returns undefined for unparseable input', () => {
    const result = parse('garbage', 'yyyy-MM-dd', new Date(), {
      in: Temporal.ZonedDateTime,
      timeZone: 'UTC',
    });
    expect(result).toBeUndefined();
  });
});

describe('parse: locale text matching', () => {
  it('matches month and weekday names case-sensitively in en-US', () => {
    const result = parse('Tuesday, February 11 2014', 'EEEE, MMMM dd yyyy', new Date());
    expect(+result).toBe(+new Date(2014, 1, 11));
  });

  it('matches narrow and abbreviated month widths', () => {
    expect(+parse('Feb 11 2014', 'MMM dd yyyy', new Date())).toBe(+new Date(2014, 1, 11));
  });

  it('matches AM/PM day period text', () => {
    expect(+parse('11:30 PM', 'h:mm a', new Date(2020, 0, 1))).toBe(+new Date(2020, 0, 1, 23, 30));
  });
});

describe('parse: priority/setter dedup', () => {
  it('matches date-fns when the same token appears twice (first-appearing wins)', () => {
    expect(() => parse('1999 2000', 'yyyy yyyy', new Date())).toThrow(RangeError);
    expect(() => dfParse('1999 2000', 'yyyy yyyy', new Date())).toThrow(RangeError);
  });
});

describe('parse: deliberate divergences from date-fns', () => {
  // Real date-fns' own internal enum-matching regex for narrow "noon" is
  // /^no/i, which doesn't match the single letter 'n' — verified directly:
  // dfParse('n', 'BBBBB', ref) returns midnight (hour 0), not noon ('mi'/'a'/
  // 'p' happen to round-trip correctly only by coincidence, since their
  // regexes are /^mi/i, /^a/i, /^p/i). temporal-fns intentionally fixes this
  // rather than replicating the bug.
  it('resolves narrow noon (BBBBB) to noon, unlike real date-fns', () => {
    const referenceDate = new Date(2020, 0, 1);
    const result = parse('n', 'BBBBB', referenceDate);
    expect(result.getHours()).toBe(12);
  });
});
