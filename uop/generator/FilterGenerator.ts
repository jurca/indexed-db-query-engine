// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import OpCode from '../OpCode.js'
import QueryRecordFilter from '../../QueryRecordFilter.js'
import RecordOp from '../RecordOp.js'

/**
 * Micro-operation code generator to be used by the query engine for generating code fragments testing a record against
 * a set of patterns and determining whether the record matches any of them.
 */
export default interface FilterGenerator {
  /**
   * Generates a micro-code fragment that will test a provided record against the provided filter alternatives until it
   * finds a match. The code fragment will perform a jump to an operation right after its last operation if a match is
   * found so that it can be joined with other code fragments performing other additional operations.
   *
   * The generated code marks the record for exclusion from query results using the
   * {@linkcode OpCode.EXCLUDE_RECORD_FROM_QUERY_RESULT} operation and terminates the code execution using the
   * {@linkcode OpCode.EXIT} operation if no match is found (these are always the last generated operations in the
   * returned code, and they are always in this order).
   *
   * The generator may generate a code that evaluates the provided filtering patterns in a different order to optimize
   * the expected runtime performance.
   *
   * @template R The type of the record to test by the generated code.
   * @param filterAlternatives The record filtering patterns to test records against. Passing an empty array is allowed
   *        and will result in a code that only performs a jump to location after its last operation (the record
   *        exclusion and exit operations are always generated for consistency).
   * @returns A code (sequence of micro-operations) that tests any provided record against the specified matching
   *          patterns for the purpose of record filtering.
   */
  <R>(filterAlternatives: readonly QueryRecordFilter<R>[]): RecordOp[]
}
