/**
 * The shape of the global defaults returned by {@link getDefaultOptions}.
 */
export interface DefaultOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  locale?: Intl.LocalesArgument;
}

// setDefaultOptions accepts an explicit `undefined` per-field to delete that
// field from the stored defaults (date-fns' documented removal mechanism).
/**
 * The {@link setDefaultOptions} function options. Set a field to `undefined` to remove it from
 * the stored defaults.
 */
export interface SetDefaultOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | undefined;
  locale?: Intl.LocalesArgument | undefined;
}

let defaultOptions: DefaultOptions = {};

export function getDefaultOptionsValue(): DefaultOptions {
  return defaultOptions;
}

export function setDefaultOptionsValue(options: SetDefaultOptions): void {
  const result: DefaultOptions = { ...defaultOptions };

  if ('weekStartsOn' in options) {
    if (options.weekStartsOn === undefined) {
      delete result.weekStartsOn;
    } else {
      result.weekStartsOn = options.weekStartsOn;
    }
  }

  if ('firstWeekContainsDate' in options) {
    if (options.firstWeekContainsDate === undefined) {
      delete result.firstWeekContainsDate;
    } else {
      result.firstWeekContainsDate = options.firstWeekContainsDate;
    }
  }

  if ('locale' in options) {
    if (options.locale === undefined) {
      delete result.locale;
    } else {
      result.locale = options.locale;
    }
  }

  defaultOptions = result;
}

export function resolveWeekStartsOn(weekStartsOn: DefaultOptions['weekStartsOn']): number {
  return weekStartsOn ?? defaultOptions.weekStartsOn ?? 0;
}

export function resolveFirstWeekContainsDate(
  firstWeekContainsDate: DefaultOptions['firstWeekContainsDate']
): number {
  return firstWeekContainsDate ?? defaultOptions.firstWeekContainsDate ?? 1;
}

export function resolveLocale(locale: DefaultOptions['locale']): Intl.LocalesArgument {
  return locale ?? defaultOptions.locale ?? 'en-US';
}
