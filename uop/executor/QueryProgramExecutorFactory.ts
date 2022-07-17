import RecordOp from '../RecordOp.js'
import RecordProgramExecutorFactory from './RecordProgramExecutorFactory.js'

/**
 * This factory is for creating micro-program executors bound to specific queries.
 * 
 * The factory is intended to be used once for every unique executed query, with the results cached to be re-used when
 * a query is used repeatedly.
 *
 * @template R The type of the database record.
 */
export default interface QueryProgramExecutorFactory<R> {
  /**
   * Returns a program executor factory configured with the provided program. The resulting program executor will run
   * the provided program.
   *
   * @param program The record processing micro-program the executor should run.
   * @returns A program executor factory to be configured with a record to execute the operations upon.
   */
  (program: readonly RecordOp[]): RecordProgramExecutorFactory<R>
}
