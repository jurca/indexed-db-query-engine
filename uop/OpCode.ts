/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars */
// @ts-ignore
import QueryExecutionContext from './executor/QueryExecutionContext.js'
// @ts-ignore
import QueryRecordPropertyFilter from '../QueryRecordPropertyFilter.js'
// @ts-ignore
import QueryUniqueValueConstraint from '../QueryUniqueValueConstraint.js'
// @ts-ignore
import RecordContext from './executor/RecordContext.js'
// @ts-ignore
import RecordPropertyProcessor from '../RecordPropertyProcessor.js'
/* eslint-enable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars */

/**
 * Enum listing all operation codes used in micro-operations processing records during query execution.
 */
enum OpCode {
  /**
   * Applies the {@linkcode RecordPropertyProcessor} specified in operation's arguments on the current record. The
   * record will be modified in place. This operation always ends with success (the
   * {@linkcode RecordContext.lastOpSuccess} flag will be `true`) (unless an error thrown by the operation's
   * implementation or the record property processor terminates the query execution).
   */
  APPLY_RECORD_PROCESSOR = 'OpCode.APPLY_RECORD_PROCESSOR',

  /**
   * Tests the current record against the {@linkcode QueryRecordPropertyFilter} specified in operation's arguments. The
   * operation will resolve query parameters (if the property filter uses one) using the
   * {@linkcode QueryExecutionContext.queryParameters} map. The operation will be successful (reflected in the
   * {@linkcode RecordContext.lastOpSuccess} flag) iff the records matches the filter.
   */
  FILTER_BY_PROPERTY = 'OpCode.FILTER_BY_PROPERTY',

  /**
   * Tests the current record against the {@linkcode QueryUniqueValueConstraint} specified in operation's arguments.
   * The operation will test the referenced record property's value against the values already tracked in the
   * {@linkcode QueryExecutionContext.uniqueValues} map. If the record has a unique value of the referenced property,
   * the value will be added to the aforementioned map by the operation.
   *
   * The operation will be successful (reflected in the {@linkcode RecordContext.lastOpSuccess} flag) iff the record's
   * property specified in the constraint has a unique value among all records examined during the current query's
   * execution so far.
   */
  FILTER_FOR_UNIQUENESS = 'OpCode.FILTER_FOR_UNIQUENESS',

  /**
   * Marks the currently examined record as excluded from the query result by setting the
   * {@linkcode RecordContext.includeRecordInQueryResult} flag to `false`. This will prevent the query engine from
   * returning the record to the caller of the query and move on to the next record to examine instead once the current
   * record processing micro-program terminates using the {@linkcode OpCode.EXIT} operation. The operation has no
   * effect if the {@linkcode RecordContext.includeRecordInQueryResult} flag is already `false`.
   *
   * The operation always ends with success (the {@linkcode RecordContext.lastOpSuccess} flag will be `true`).
   */
  EXCLUDE_RECORD_FROM_QUERY_RESULT = 'OpCode.EXCLUDE_RECORD_FROM_QUERY_RESULT',

  /**
   * Performs an unconditional relative jump in the record processing micro-program. The operation adds the operation's
   * argument to the {@linkcode RecordContext.opIndex} program counter. Note that the micro-program executor will still
   * increment the {@linkcode RecordContext.opIndex} program counter even when this operation is executed, therefore
   * this operation's argument should specify a jump to the operation just before the operation that should be executed
   * next. This enables the program executor to treat all operations in the same way, simplifying its design and
   * extensibility, and makes it easier to extend the instruction set with new jump operations. The operation always
   * ends with success (the {@linkcode RecordContext.lastOpSuccess} flag will be `true`).
   */
  JUMP = 'OpCode.JUMP',

  /**
   * Performs a relative jump in the record processing micro-program iff the {@linkcode RecordContext.lastOpSuccess}
   * flag's state matches the state specified in operation's arguments. The operation preforms the jump by adding the
   * program counter offset specified in operation's arguments to the {@linkcode RecordContext.opIndex} program
   * counter. Note that the micro-program executor will still increment the {@linkcode RecordContext.opIndex} program
   * counter even when this operation is executed, therefore this operation's argument should specify a jump to the
   * operation just before the operation that should be executed next. This enables the program executor to treat all
   * operations in the same way, simplifying its design and extensibility, and makes it easier to extend the
   * instruction set with new jump operations. The operation will be successful (reflected in the
   * {@linkcode RecordContext.lastOpSuccess} flag) iff the operation performs the jump.
   */
  JUMP_IF_LAST_OP_RESULT_MATCH = 'OpCode.JUMP_IF_LAST_OP_RESULT_MATCH',

  /**
   * Terminates the execution of the record processing micro-program immediately by setting the
   * {@linkcode RecordContext.running} flag to `false`, letting the query engine to proceed to examine the next record,
   * and return the current record to the query caller iff the {@linkcode RecordContext.includeRecordInQueryResult}
   * flag is `true` (the record may be returned to the caller at a later moment if more processing is required, e.g.
   * applying additional sorting of the matched records). The operation always ends with success (the
   * {@linkcode RecordContext.lastOpSuccess} flag will be `true`).
   *
   * Note that the micro-program's execution will also be terminated if the {@linkcode RecordContext.opIndex} points
   * right after the last operation of the micro-program.
   */
  EXIT = 'OpCode.EXIT',
}

export default OpCode
