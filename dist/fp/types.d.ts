//#region src/fp/types.d.ts
/**
 * A curried, data-last variant of a 1-argument function.
 */
interface FPFn1<Result, Arg1> {
  (arg1: Arg1): Result;
}
/**
 * A curried, data-last variant of a 2-argument function. `Arg1` is the first positional parameter
 * of the underlying function; it is curried in last.
 */
interface FPFn2<Result, Arg2, Arg1> {
  (arg2: Arg2): (arg1: Arg1) => Result;
  (arg2: Arg2, arg1: Arg1): Result;
}
/**
 * A curried, data-last variant of a 3-argument function. `Arg1` is the first positional parameter
 * of the underlying function; it is curried in last.
 */
interface FPFn3<Result, Arg3, Arg2, Arg1> {
  (arg3: Arg3): (arg2: Arg2) => (arg1: Arg1) => Result;
  (arg3: Arg3): (arg2: Arg2, arg1: Arg1) => Result;
  (arg3: Arg3, arg2: Arg2): (arg1: Arg1) => Result;
  (arg3: Arg3, arg2: Arg2, arg1: Arg1): Result;
}
/**
 * A curried, data-last variant of a 4-argument function. `Arg1` is the first positional parameter
 * of the underlying function; it is curried in last.
 */
interface FPFn4<Result, Arg4, Arg3, Arg2, Arg1> {
  (arg4: Arg4): (arg3: Arg3) => (arg2: Arg2) => (arg1: Arg1) => Result;
  (arg4: Arg4): (arg3: Arg3) => (arg2: Arg2, arg1: Arg1) => Result;
  (arg4: Arg4): (arg3: Arg3, arg2: Arg2) => (arg1: Arg1) => Result;
  (arg4: Arg4): (arg3: Arg3, arg2: Arg2, arg1: Arg1) => Result;
  (arg4: Arg4, arg3: Arg3): (arg2: Arg2) => (arg1: Arg1) => Result;
  (arg4: Arg4, arg3: Arg3): (arg2: Arg2, arg1: Arg1) => Result;
  (arg4: Arg4, arg3: Arg3, arg2: Arg2): (arg1: Arg1) => Result;
  (arg4: Arg4, arg3: Arg3, arg2: Arg2, arg1: Arg1): Result;
}
//#endregion
export { FPFn1, FPFn2, FPFn3, FPFn4 };
//# sourceMappingURL=types.d.ts.map