//#region src/from-unix-time-plain-date-time.d.ts
/**
 * @summary Create a `Temporal.PlainDateTime` from a Unix timestamp.
 *
 * @description
 * Create a `Temporal.PlainDateTime` from a Unix timestamp (in seconds). Decimal values will be
 * discarded. Per the UTC rule, the timestamp's wall-clock fields are resolved using UTC.
 *
 * @param unixTime - The given Unix timestamp (in seconds)
 *
 * @returns The date and time
 */
declare function fromUnixTimePlainDateTime(unixTime: number): Temporal.PlainDateTime;
//#endregion
export { fromUnixTimePlainDateTime };
//# sourceMappingURL=from-unix-time-plain-date-time.d.ts.map