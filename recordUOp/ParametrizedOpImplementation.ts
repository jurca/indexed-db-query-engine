import QueryExecutionContext from './QueryExecutionContext.js'
import RecordContext from './RecordContext.js'

/**
 * A record processing operation implementation that has been bound to its arguments, needing only a query execution
 * context and record context (containing also the current record) to be executed. These are created by the query
 * engine before the query is executed so that less data has to be passed around while executing a record processing
 * micro-program.
 *
 * @template R The type of the database record.
 */
export default interface ParametrizedOpImplementation<R> {
  /**
   * Executes the record processing operation using the provided query execution context and record context on the
   * current record. The operation returns `true` iff it was successful, e.g. a filtering test passed (please refer to
   * each opcode's documentation for more details).
   *
   * @param queryContext The context data used while executing the current query.
   * @param recordContext The context data used while processing the provided record.
   * @returns `true` if the operation was successful, `false` otherwise.
   */
  (queryContext: QueryExecutionContext<R>, recordContext: RecordContext<R>): boolean
}
