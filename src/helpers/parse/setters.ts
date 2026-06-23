export interface WorkingFields {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
  // Set by X/x tokens; undefined means "no explicit offset was parsed".
  offsetMinutes: number | undefined;
  // Set by t/T tokens; mutually exclusive with every other token
  // (incompatibleTokens: '*'), so when set it's the sole source of truth.
  epochMilliseconds: number | undefined;
}

export interface SetterFlags {
  era?: 1 | 0;
  timestampIsSet?: boolean;
}

export interface FieldSetter {
  tokenChar: string;
  priority: number;
  subPriority: number;
  validate?: (fields: WorkingFields) => boolean;
  apply: (fields: WorkingFields, flags: SetterFlags) => WorkingFields;
}

// Ported from date-fns' parse.js `uniquePrioritySetters` dedup: group by
// priority (descending), keep the highest-subPriority entry per group.
// Array.prototype.sort is stable and setters are pushed in token-appearance
// order, so among equal priority+subPriority entries the FIRST-appearing one
// survives the sort+pick — i.e. earlier tokens win ties, not later ones.
// Verified against real date-fns behavior in tests/parse.test.ts rather than
// assumed from date-fns' prose docs alone.
//
// Each chosen setter is validated against the fields as they stand at that
// point in the (descending-priority) loop, exactly mirroring date-fns'
// `setter.validate(date, ...)` call immediately before `setter.set(...)` in
// its main loop — an invalid setter (e.g. day 31 in a 30-day month) aborts
// the whole parse, signaled here by returning `undefined`.
export function applySetters(
  seed: WorkingFields,
  setters: FieldSetter[]
): WorkingFields | undefined {
  const priorities = [...new Set(setters.map((setter) => setter.priority))].sort((a, b) => b - a);

  const flags: SetterFlags = {};
  let fields = seed;

  for (const priority of priorities) {
    const bySubPriority = setters
      .filter((setter) => setter.priority === priority)
      .sort((a, b) => b.subPriority - a.subPriority);
    // bySubPriority is always non-empty here: `priority` is drawn from
    // `priorities`, which is itself derived from `setters`, so at least one
    // setter always matches this exact priority value; the `if (!chosen)`
    // branch only satisfies noUncheckedIndexedAccess.
    const chosen = bySubPriority[0];
    /* v8 ignore next 3 */
    if (!chosen) {
      continue;
    }
    if (chosen.validate && !chosen.validate(fields)) {
      return undefined;
    }
    fields = chosen.apply(fields, flags);
  }

  return fields;
}
