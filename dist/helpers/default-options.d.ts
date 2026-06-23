//#region src/helpers/default-options.d.ts
/**
 * The shape of the global defaults returned by {@link getDefaultOptions}.
 */
interface DefaultOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  locale?: Intl.LocalesArgument;
}
/**
 * The {@link setDefaultOptions} function options. Set a field to `undefined` to remove it from
 * the stored defaults.
 */
interface SetDefaultOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | undefined;
  locale?: Intl.LocalesArgument | undefined;
}
//#endregion
export { DefaultOptions, SetDefaultOptions };
//# sourceMappingURL=default-options.d.ts.map