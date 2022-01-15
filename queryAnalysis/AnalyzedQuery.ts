import Query from '../Query.js'
import RecordPropertyProcessor from '../RecordPropertyProcessor.js'
import AnalyzedFilter from './AnalyzedFilter.js'
import AnalyzedOrderBy from './AnalyzedOrderBy.js'
import AnalyzedUniqueValueConstraint from './AnalyzedUniqueValueConstraint.js'

/**
 * Result of a basic analysis and optimization of a query. This is analysis is not bound to any object store, enabling
 * reuse with multiple object stores if required.
 */
export default interface AnalyzedQuery<S, I = S, R = I> {
  /**
   * The original query that has been analyzed.
   */
  readonly query: Query<S, I, R>

  /**
   * The largest common denominator of all record matching patterns in the original query.
   */
  readonly mainFilter: AnalyzedFilter<S, I>

  /**
   * A record matching pattern that has been derived from one of the query's filter alternatives after deduplication
   * and merging of overlaps, with the largest common denominator pattern (the {@linkcode mainFilter}) removed from
   * this pattern.
   */
  readonly additionalFilterAlternatives: readonly AnalyzedFilter<S, I>[]

  /**
   * Additional filtering constraints requiring the matched records to have unique values at the specified properties.
   * Treatment of values that cannot be used as valid IndexedDB keys when determining uniqueness is undefined and is up
   * to the query engine.
   */
  readonly onlyUnique: AnalyzedUniqueValueConstraint<S, I>

  /**
   * Desired ordering of the records in query results. The record ordering requirements are applied lexicographically,
   * with the {@linkcode AnalyzedOrderBy.indexable} requirements being applied before the
   * {@linkcode AnalyzedOrderBy.preProcessorDependant} ones.
   *
   * The query engine may return the matched records in any order if no ordering requirements are provided.
   */
  readonly orderBy: AnalyzedOrderBy<S, I>

  /**
   * Record modification functions to apply as the records are scanned in the underlying storage, before filters or
   * ordering is applied. This primarily enables filtering and sorting of records using values derived from the stored
   * values.
   *
   * These property pre-processors exclude any pre-processor that has been deemed by the query engine to have no effect
   * on the outcome of sorting or filtering the records - these have been moved to the start of the record property
   * post-processors.
   *
   * The property processors will be applied in order chosen by the query engine, but property processors affecting
   * each other's inputs are guaranteed to be executed in the order they were specified in.
   */
  readonly recordPreProcessor: readonly RecordPropertyProcessor<S, I>[]

  /**
   * Record modification functions to apply after the records have been filtered and sorted, but before they are
   * returned from the query.
   * 
   * These property post-processors include all property post-processors of the query, as well as any property
   * pre-processor the query engine deemed to have no effect on record sorting or filtering.
   * 
   * The property processors will be applied in order chosen by the query engine, but property processors affecting
   * each other's inputs are guaranteed to be executed in the order they were specified in.
   */
  readonly recordPostProcessor: readonly RecordPropertyProcessor<I, R>[]
}
