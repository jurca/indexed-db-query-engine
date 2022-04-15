import QueryOrderBy from '../QueryOrderBy.js'
import PreProcessorDependantQueryOrderBy from './PreProcessorDependantQueryOrderBy.js'

/**
 * Record ordering specification that has been analyzed to identify sorting clauses that can be applied by utilizing
 * object store indexes (if such indexes exist at least partially).
 *
 * @template S The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed.
 * @template I The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
 *           all pre-processors applied.
 */
export default interface AnalyzedOrderBy<S, I> {
  /**
   * Record ordering that is independent of any of the query's record pre-processors. The query engine may therefore
   * utilize an object store's primary key and/or its indexes to execute the desired record sorting (at least
   * partially, depends on the query and object store at hand).
   */
  readonly indexable: readonly QueryOrderBy<S>[]

  /**
   * Record ordering that is dependant on at least one of the query's record pre-processors. Since records are ordered
   * by these ordering specifications lexicographically, this array contains every item since the first that would be
   * affected by a record pre-processor.
   */
  readonly preProcessorDependant: readonly PreProcessorDependantQueryOrderBy<S, I>[]
}
