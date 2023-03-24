import QueryParameter from '../QueryParameter.js'
import AnalyzedPreProcessorDependantQueryRecordFilter from './AnalyzedPreProcessorDependantQueryRecordFilter.js'
import AnalyzedQueryRecordFilter from './AnalyzedQueryRecordFilter.js'

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
  readonly indexable: AnalyzedQueryRecordFilter<S>

  /**
   * The part of the record matching pattern that is dependant on the effects of record pre-processors.
   */
  readonly preProcessorDependant: AnalyzedPreProcessorDependantQueryRecordFilter<S, I>

  /**
   * The sum of the {@linkcode AnalyzedPreProcessorDependantQueryRecordFilter.preProcessingCost} of
   * {@linkcode preProcessorDependant} part of this filter, {@linkcode minimumPropertyAccessCost},
   * {@linkcode minimumValueMatchCost} and {@linkcode valueMatchParameters.length} properties. The actual execution
   * cost may be higher depending on the pre-processors and query parameters used.
   *
   * This cost estimate does not include the indexable part of this filter because its cost will depend on the indexes
   * that will be utilized during query execution.
   */
  readonly minimumEstimatedCost: number

  /**
   * The total expected execution cost of accessing all properties in the {@linkcode preProcessorDependant} part of
   * this filter. This property mirrors {@linkcode AnalyzedPreProcessorDependantQueryRecordFilter.propertyAccessCost}
   * property of {@linkcode preProcessorDependant} filter.
   *
   * This cost estimate does not include the indexable part of this filter because its cost will depend on the indexes
   * that will be utilized during query execution.
   */
  readonly minimumPropertyAccessCost: number

  /**
   * This property mirrors the {@linkcode AnalyzedPreProcessorDependantQueryRecordFilter.minimumValueMatchCost} of the
   * {@linkcode preProcessorDependant} part of this filter.
   *
   * This cost estimate does not include the indexable part of this filter because its cost will depend on the indexes
   * that will be utilized during query execution.
   */
  readonly minimumValueMatchCost: number

  /**
   * This property mirrors the {@linkcode AnalyzedPreProcessorDependantQueryRecordFilter.valueMatchParameters} property
   * of the the {@linkcode preProcessorDependant} part of this filter. The query parameters are not deduplicated, so
   * that their value matching costs are accounted for every value matching they are used for.
   *
   * This cost estimate does not include the indexable part of this filter because its cost will depend on the indexes
   * that will be utilized during query execution.
   */
  readonly valueMatchParameters: readonly QueryParameter[]
}
