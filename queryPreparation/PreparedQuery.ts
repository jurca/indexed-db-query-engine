import AnalyzedObjectStoreQuery from '../objectStoreQueryAnalysis/AnalyzedObjectStoreQuery.js'
import QueryExecutionPlan from './QueryExecutionPlan.js'

/**
 * The result of analysis on preferred execution of a query generated from query analysis.
 *
 * @template S The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed.
 * @template I The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
 *           all pre-processors applied.
 * @template R The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
 *           all pre-processors and post-processors applied.
 */
export default interface PreparedQuery<S, I = S, R = I> {
  /**
   * The analyzed query that was used to generate this query execution analysis.
   */
  readonly query: AnalyzedObjectStoreQuery<S, I, R>

  /**
   * The name of the index that is generally preferred for executing the query.
   *
   * Note that the query engine may in specific situations decide to use a different index and execution plan, if it
   * estimates that such query execution might perform better (this could be based on provided query parameter values
   * and expected number of records matched by various indexes).
   */
  readonly preferredIndexName: string | null

  /**
   * A shorthand for accessing the query execution plan for the preferred index.
   */
  readonly preferredPlan: QueryExecutionPlan<S, I, R>

  /**
   * Execution plans for all indexes on the object store on which the query will be executed, with their names used as
   * map keys, and the query execution plan for not using any index but executing the query directly on the object
   * store, stored under the `null` key.
   */
  readonly planCandidates: ReadonlyMap<string | null, QueryExecutionPlan<S, I, R>>
}
