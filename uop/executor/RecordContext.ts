/**
 * Context available to a record processing micro-program during the processing of a single record. A new context is
 * created for every record examined by the query engine. The context is used to track data related to the current
 * record and the execution of the micro-program for the current record.
 *
 * @template R The type of the database record.
 */
export default interface RecordContext<R> {
  /**
   * The database record currently being inspected and modified.
   */
  record: R

  /**
   * Whether or not the record processing micro-program is currently running. This flag is used by the micro-program to
   * terminate its execution prematurely if an outcome of the micro-program has already been determined. The
   * micro-program executor halts once this flag is set to `false` and won't increment the {@linkcode opIndex} program
   * counter.
   *
   * This property is set to `true` when the micro-program is started.
   */
  running: boolean

  /**
   * The index of the micro-program's current operation being executed. This index is always incremented by the
   * micro-program executor after the current operation is executed, including when the current operation performs a
   * jump (modifies this property's value).
   *
   * This property is set to `0` when the micro-program is started.
   */
  opIndex: number

  /**
   * The operation result returned by the implementation of the last executed operation. This is primarily used to
   * track the result of tests performed on the current record and to perform conditional jumps based on the test
   * result.
   *
   * This property is set to `true` when the micro-program is started.
   */
  readonly lastOpSuccess: boolean

  /**
   * Whether or not the current record is to be returned by the query engine to the query caller. This is used to skip
   * over the records that do not match record filters applied using a record processing micro-program.
   *
   * This property is set to `true` when the micro-program is started.
   */
  includeRecordInQueryResult: boolean
}
