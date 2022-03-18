import Query from '../Query.js'
import RecordPropertyProcessor from '../RecordPropertyProcessor.js'
import RecordOp from '../recordUOp/RecordOp.js'
import AnalyzedFilter from './AnalyzedFilter.js'
import AnalyzedOrderBy from './AnalyzedOrderBy.js'
import AnalyzedRecordPropertyProcessor from './AnalyzedRecordPropertyProcessor.js'
import AnalyzedUniqueValueConstraint from './AnalyzedUniqueValueConstraint.js'

/**
 * Result of a basic analysis and optimization of a query. This is analysis is not bound to any object store, enabling
 * reuse with multiple object stores if required.
 *
 * Note that any query properties that are not affected by the analysis are left out on purpose, and are still
 * accessible through the {@linkcode query} property.
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
   * on the outcome of sorting or filtering the records - these have been moved to the
   * {@linkcode postponedRecordPreProcessor}.
   *
   * The property processors will be applied in order chosen by the query engine, but property processors affecting
   * each other's inputs are guaranteed to be executed in the order they were specified in. The order of property
   * processors in this list reflects that, with every dependency of every pre-processor in the list being located at a
   * lower index that the pre-processor at hand.
   */
  readonly recordPreProcessor: readonly AnalyzedRecordPropertyProcessor<S, I>[]

  /**
   * Record modification functions to apply after the records have been filtered and sorted, but before the record
   * modification functions in the {@linkcode Query.recordPostProcessor} property are applied.
   *
   * These property processors include all property pre-processors the query engine deemed to have no effect on record
   * sorting or filtering.
   *
   * The property processors will be applied in order chosen by the query engine, but property processors affecting
   * each other's inputs are guaranteed to be executed in the order they were specified in. The order of property
   * processors in this list reflects that, with every dependency of every pre-processor in the list being located at a
   * lower index that the pre-processor at hand.
   */
  readonly postponedRecordPreProcessor: readonly RecordPropertyProcessor<I, R>[]

  /**
   * Record processing micro-program that applies the pre-processor dependant parts of the {@linkcode mainFilter} and
   * {@linkcode onlyUnique} record constraints as well the pre-processors required by them.
   *
   * The order of the operations is optimized for applying the cheapest operations (pre-processors and filters) first
   * so that the more expensive operations are more likely to be executed less often, in order to improve the overall
   * performance of query execution.
   *
   * The query engine may chain this program with other programs together before executing it.
   */
  readonly mainFilteringOps: readonly RecordOp[]

  /**
   * Record processing micro-program that applies the pre-processor dependant part of the
   * {@linkcode additionalFilterAlternatives} record constraints as well as the pre-processors required by them, except
   * for the pre-processors that were already applied by the {@linkcode mainFilteringOps} micro-program. This
   * micro-program is always executed after the {@linkcode mainFilteringOps} micro-program, since the
   * {@linkcode mainFilter} filtering constraints must be satisfied by all records returned from the query and can be
   * assumed to be computationally cheaper to apply than evaluating multiple filtering alternatives and finding the
   * first that matches the record at hand.
   *
   * The order of operations is optimized for applying the cheapest operations (pre-processors and filters) first so
   * that the more expensive operations are more likely to be executed less often, in order to improve the overall
   * performance of query execution.
   *
   * The query engine may chain this program with other programs together before executing it.
   */
  readonly additionalFilteringOps: readonly RecordOp[]

  /**
   * Record processing micro-program that applies the remaining record pre-processors in the
   * {@linkcode recordPreProcessor} list, that weren't applied by the {@linkcode mainFilteringOps} and
   * {@linkcode additionalFilteringOps} micro-programs, so that the records can be sorted. This micro-program is always
   * executed after the aforementioned onces, since it's cheaper (in computation terms) to filter the records first and
   * sort them second (the number of records that will need to be filtered is the same regardless of the order in which
   * the programs are applied, however, by filtering the records first, the query engine is likely to end up with a
   * smaller set of records to sort if any records were filtered out). That is why this micro-program does not apply
   * any record pre-processors required for sorting that are already required for filtering the records.
   *
   * The query engine may chain this program with other programs together before executing it.
   */
  readonly preSortingOps: readonly RecordOp[]

  /**
   * Record processing micro-program that applies the record property processors in the
   * {@linkcode postponedRecordPreProcessor} and {@linkcode Query.recordPostProcessor} lists.
   *
   * The query engine may choose to execute this program before or after sorting the records as this makes no
   * difference from performance perspective.
   *
   * The query engine may chain this program with other programs together before executing it.
   */
  readonly postProcessingOps: readonly RecordOp[]
}
