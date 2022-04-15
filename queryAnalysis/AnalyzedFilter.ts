import QueryRecordFilter from '../QueryRecordFilter.js'
import PreProcessorDependantQueryRecordPropertyFilter from './PreProcessorDependantQueryRecordPropertyFilter.js'

/**
 * A record matching pattern that has been analyzed and had its property constraints split into two groups depending on
 * whether a given property is matched by for its stored value or a value returned by a record pre-processor.
 *
 * @template S The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed.
 * @template I The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
 *           all pre-processors applied.
 */
export default interface AnalyzedFilter<S, I> {
  /**
   * The part of the record matching pattern that is not affected by the query's record pre-processors. This enables
   * the query engine to utilize matching indexes during query execution.
   */
  readonly indexable: QueryRecordFilter<S>

  /**
   * The part of the record matching pattern that is dependant on the effects of record pre-processors.
   */
  readonly preProcessorDependant: readonly PreProcessorDependantQueryRecordPropertyFilter<S, I>[]
}
