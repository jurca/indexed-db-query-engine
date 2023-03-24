import QueryFilterAlternatives from './QueryFilterAlternatives.js'
import QueryOrderBy from './QueryOrderBy.js'
import QueryParameter from './QueryParameter.js'
import QueryUniqueValueConstraint from './QueryUniqueValueConstraint.js'
import RecordDeduplicationMode from './RecordDeduplicationMode.js'
import RecordPropertyProcessor from './RecordPropertyProcessor.js'

/**
 * A description of a query to execute on a {@linkcode IDBObjectStore}.
 *
 * @template S The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed.
 * @template I The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
 *           all pre-processors applied.
 * @template R The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
 *           all pre-processors and post-processors applied.
 */
export default interface Query<S, I = S, R = I> {
  /**
   * How potentially duplicate records matched by the query are to be handled. The query may match the same record
   * multiple times if any of the {@linkcode QueryRecordPropertyFilter.expandMultiEntry},
   * {@linkcode QueryUniqueValueConstraint.expandMultiEntry} or {@linkcode QueryOrderBy.expandMultiEntry} flags is set.
   */
  readonly recordDeduplication: RecordDeduplicationMode

  /**
   * Filtering constraints used to match the records.
   */
  readonly filter: QueryFilterAlternatives<I>

  /**
   * Additional filtering constraints requiring the matched records to have unique values at the specified properties.
   * Treatment of values that cannot be used as valid IndexedDB keys when determining uniqueness is undefined and is up
   * to the query engine.
   */
  readonly onlyUnique: readonly QueryUniqueValueConstraint<I>[]

  /**
   * Desired ordering of the records in query results. The records are sorted lexicographically, that is by the order
   * specified by the first item in the array, matching records are sorted by the order specified by the second item,
   * etc. The query engine may return the matched records in any order if the array is empty.
   */
  readonly orderBy: readonly QueryOrderBy<I>[]

  /**
   * The number of records matched by the query that should be skipped before a matching record is added to the query
   * result. This must be a safe nonnegative integer (an integer greater or equal to 0 and lower or equal to
   * `Number.MAX_SAFE_INTEGER`).
   */
  readonly skipFirst: number | QueryParameter

  /**
   * The maximum number or records the query may return. This must be a safe positive integer (an integer greater or
   * equal to 1 and lower or equal to `Number.MAX_SAFE_INTEGER`), or `Infinity` if no limit is to be applied.
   */
  readonly recordLimit: number | QueryParameter

  /**
   * The maximum number of records the query engine may examine while executing the query before terminating query
   * execution prematurely. This must be a safe positive integer (an integer greater or equal to 1 and lower or equal
   * to `Number.MAX_SAFE_INTEGER`), or `Infinity` if no limit is to be applied.
   */
  readonly examinedRecordsLimit: number | QueryParameter

  /**
   * Record modification functions to apply as the records are scanned in the underlying storage, before filters or
   * ordering is applied. This primarily enables filtering and sorting of records using values derived from the stored
   * values. The property processors will be applied in order chosen by the query engine, but property processors
   * affecting each other's inputs are guaranteed to be executed in the order they were specified in.
   * 
   * The query engine may choose to move any pre-processor that would not have any impact on record sorting or
   * filtering to the post-processors, while respecting possible dependencies between the inputs and outputs of pre-
   * and post-processors.
   */
  readonly recordPreProcessor: readonly RecordPropertyProcessor<S, I>[]

  /**
   * Record modification functions to apply after the records have been filtered and sorted, but before they are
   * returned from the query. The property processors will be applied in order chosen by the query engine, but property
   * processors affecting each other's inputs are guaranteed to be executed in the order they were specified in.
   */
  readonly recordPostProcessor: readonly RecordPropertyProcessor<I, R>[]
}
