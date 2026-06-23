// Converts a normal, data-first function into a curried, data-last function at runtime.
//
// `fn` is called with its original (data-first) argument order; `convertToFP` only reverses the
// order in which arguments are *supplied* by the caller. E.g. for a 2-arity `fn(date, amount)`,
// the curried form accepts `(amount)(date)` or `(amount, date)`, and internally calls
// `fn(date, amount)`.
//
// Currying stops accepting more arguments once `arity` arguments have been collected in total
// (across all curried calls), at which point `fn` is invoked with those arguments reversed back
// into their original positional order.
export function convertToFP(
  fn: (...args: never[]) => unknown,
  arity: number
): (...args: never[]) => unknown {
  function curried(args: unknown[]): unknown {
    if (args.length >= arity) {
      return fn(...(args.slice(0, arity).reverse() as never[]));
    }
    return (...rest: unknown[]) => curried([...args, ...rest]);
  }
  return curried([]) as (...args: never[]) => unknown;
}
