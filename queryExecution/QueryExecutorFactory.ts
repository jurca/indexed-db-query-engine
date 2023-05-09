import QueryProgramExecutorFactory from '../uop/executor/QueryProgramExecutorFactory.js'
import QueryExecutor from './QueryExecutor.js'

/**
 * Factory for creating new {@linkcode QueryExecutor} instances configured with specific
 * {@linkcode QueryProgramExecutorFactory}.
 */
export default interface QueryExecutorFactory {
  /**
   * Creates a new query executor that will utilize the provided query program executor factory.
   *
   * @template R The type of the database records.
   * @param programExecutorFactory The query program executor factory the query executor will use.
   * @returns Query executor that will use the provided query program executor factory.
   */
  <R>(programExecutorFactory: QueryProgramExecutorFactory<R>): QueryExecutor
}
