import QueryExecutionContext from './QueryExecutionContext.js'
import RecordContext from './RecordContext.js'

/**
 * General-purpose executor of a record processing micro-program allowing step-by-step (op-by-op) execution.
 *
 * @template R The type of the database record.
 */
export default interface RecordProgramExecutorFactory<R> {
  /**
   * Returns an iterable iterator for executing the provided program one step at a time using the provided contexts and
   * record.
   *
   * The returned iterator does not start executing the operations of the program until the first call to
   * {@linkcode IterableIterator.next}.
   *
   * A call to {@linkcode IterableIterator.next} of the returned iterator executes the current program operation
   * referenced by the {@linkcode RecordContext.opIndex} program counter, increments the program counter and then
   * yields.
   *
   * The iterator ends once the {@linkcode RecordContext.opIndex} program counter points after the last operation of
   * the micro-program or the {@linkcode RecordContext.running} flag is set to `false`. These conditions are tested
   * both before executing an operation and after incrementing the program counter.
   *
   * @param queryContext Query execution context to be used by the micro-program's execution. This context is meant to
   *        be re-used for all processed records during a single query execution.
   * @param recordContext Record context to be used by the micro-program's execution.
   * @param record The record on which the micro-program's operations should perform calculations, tests and
   *        modifications.
   * @returns An iterator that executes a single operation every time its {@linkcode IterableIterator.next} method is
   *          invoked.
   */
  (
    queryContext: QueryExecutionContext<R>,
    recordContext: RecordContext<R>,
    record: R,
  ): IterableIterator<void>
}
