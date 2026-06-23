// Curried "FP" function interfaces, mirroring date-fns' own fp/types.d.ts convention: `FPFnN`
// describes a function of arity N that can be called either fully applied (positional, data-last)
// or partially applied one argument at a time (curried), in each case from the LAST positional
// argument toward the FIRST. Generic type parameters are listed in REVERSED positional order
// (Result, ArgN, ArgN-1, ..., Arg1) so that `Arg1` - the first positional parameter of the
// underlying function (typically the "data" being operated on) - is always the LAST generic
// parameter and the LAST argument curried in (i.e. data-last).

/**
 * A curried, data-last variant of a 1-argument function.
 */
export interface FPFn1<Result, Arg1> {
  (arg1: Arg1): Result;
}

/**
 * A curried, data-last variant of a 2-argument function. `Arg1` is the first positional parameter
 * of the underlying function; it is curried in last.
 */
export interface FPFn2<Result, Arg2, Arg1> {
  (arg2: Arg2): (arg1: Arg1) => Result;
  (arg2: Arg2, arg1: Arg1): Result;
}

/**
 * A curried, data-last variant of a 3-argument function. `Arg1` is the first positional parameter
 * of the underlying function; it is curried in last.
 */
export interface FPFn3<Result, Arg3, Arg2, Arg1> {
  (arg3: Arg3): (arg2: Arg2) => (arg1: Arg1) => Result;
  (arg3: Arg3): (arg2: Arg2, arg1: Arg1) => Result;
  (arg3: Arg3, arg2: Arg2): (arg1: Arg1) => Result;
  (arg3: Arg3, arg2: Arg2, arg1: Arg1): Result;
}

/**
 * A curried, data-last variant of a 4-argument function. `Arg1` is the first positional parameter
 * of the underlying function; it is curried in last.
 */
export interface FPFn4<Result, Arg4, Arg3, Arg2, Arg1> {
  (arg4: Arg4): (arg3: Arg3) => (arg2: Arg2) => (arg1: Arg1) => Result;
  (arg4: Arg4): (arg3: Arg3) => (arg2: Arg2, arg1: Arg1) => Result;
  (arg4: Arg4): (arg3: Arg3, arg2: Arg2) => (arg1: Arg1) => Result;
  (arg4: Arg4): (arg3: Arg3, arg2: Arg2, arg1: Arg1) => Result;
  (arg4: Arg4, arg3: Arg3): (arg2: Arg2) => (arg1: Arg1) => Result;
  (arg4: Arg4, arg3: Arg3): (arg2: Arg2, arg1: Arg1) => Result;
  (arg4: Arg4, arg3: Arg3, arg2: Arg2): (arg1: Arg1) => Result;
  (arg4: Arg4, arg3: Arg3, arg2: Arg2, arg1: Arg1): Result;
}
