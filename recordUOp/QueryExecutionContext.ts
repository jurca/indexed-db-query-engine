import PropertyPath from '../PropertyPath.js'
import QueryParameter from '../QueryParameter.js'

/**
 * Shared context available to all record processing micro-programs executed during the processing of a single query. A
 * new context is created for every query executed by the query engine and the context is used while examining every
 * record inspected by the query engine during the execution of the query. The context is used to track data related to
 * the current query and its execution.
 */
export default interface QueryExecutionContext<R> {
  /**
   * All so far encountered unique values of record properties at the specified property paths. This is used for
   * filtering the records by unique property values.
   *
   * This property is set to an empty map when the query execution is started.
   */
  readonly uniqueValues: Map<readonly PropertyPath<R>[], Set<unknown>>

  /**
   * All query parameter values passed to the query. The query engine ensures that values for all parameters of a query
   * have been provided, otherwise the query execution is rejected by the query engine.
   */
  readonly queryParameters: ReadonlyMap<QueryParameter, IDBKeyRange>
}
