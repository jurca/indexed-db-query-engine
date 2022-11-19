import QueryUniqueValueConstraint from '../../QueryUniqueValueConstraint.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import OpCode from '../OpCode.js'
import RecordOp from '../RecordOp.js'

/**
 * Micro-operation code generator to be used by the query engine for generating code fragments testing a set of record
 * properties for having unique values.
 */
export default interface UniqueValueCheckGenerator {
  /**
   * Generates a micro-code fragment that will test the properties specified by the provided constraints on a provided
   * record for unique values. The code fragment will perform a jump to an operation right after its last operation if
   * all tested properties have unique values so that it can be joined with other code fragments performing other
   * additional operations.
   *
   * The generated code marks the record for exclusion from query results using the
   * {@linkcode OpCode.EXCLUDE_RECORD_FROM_QUERY_RESULT} operation and terminates the code execution using the
   * {@linkcode OpCode.EXIT} operation if inspecting the value of any property will encounter a match with a previously
   * encountered value of the given property (these are always the last generated operations in the returned code, and
   * they are always in this order).
   *
   * The property values are tracked per individual query and record property.
   *
   * The generator may generate a code that evaluates the provided constraints in a different order to optimize the
   * expected runtime performance.
   *
   * @template R The type of the record to test by the generated code.
   * @param constraints The property value uniqueness constraints to test on records. Passing an empty array is allowed
   *        and will result in a code that only performs a jump to location after its last operation (the record
   *        exclusion and exit operations are always generated for consistency).
   * @returns A code (sequence of micro-operations) that tests any provided record for uniqueness of the specified
   *          properties' values for the purpose of record filtering.
   */
  <R>(constraints: readonly QueryUniqueValueConstraint<R>[]): RecordOp[]
}
