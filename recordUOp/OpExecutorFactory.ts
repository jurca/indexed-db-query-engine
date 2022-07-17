import QueryProgramExecutorFactory from './QueryProgramExecutorFactory.js'
import RecordOpImplementations from './RecordOpImplementations.js'

/**
 * This factory enables the creation of micro-operation program executors parametrized with a provided implementation
 * for the micro-operations themselves. This serves mostly to split the executor's implementation into smaller, easier
 * to maintain modules.
 * 
 * This factory is intended to be used once and the result cached for the duration of the query engine's life cycle.
 *
 * @template R The type of the database record.
 * @template I The type of the database record with any of the pre-processors applied.
 */
export default interface OpExecutorFactory<R, I> {
  /**
   * Returns the program executor factory configured with the provided micro-operations implementations. The resulting
   * program executor will use the provided implementation to execute the program provided to the returned factory.
   *
   * @param opImplementations The implementation of all supported micro-operations to use.
   * @returns A program executor factory to be configured with a program to execute and query context to use during the
   *          program's execution.
   */
  (opImplementations: RecordOpImplementations<R, I>): QueryProgramExecutorFactory<R>
}
