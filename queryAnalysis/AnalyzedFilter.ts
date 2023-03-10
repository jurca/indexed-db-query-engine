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
   * {@linkcode preProcessorDependant} part of this filter, {@linkcode propertyAccessCost},
   * {@linkcode minimumValueMatchCost} and {@linkcode valueMatchParameters.length} properties. The actual execution
   * cost may be higher depending on the pre-processors and query parameters used.
   */
  readonly minimalEstimatedCost: number

  /**
   * The total expected execution cost of accessing all properties in the {@linkcode indexable} and
   * {@linkcode preProcessorDependant} filters. This is computed by summing up the
   * {@linkcode AnalyzedQueryRecordFilter.propertyAccessCost} and
   * {@linkcode AnalyzedPreProcessorDependantQueryRecordFilter.propertyAccessCost} properties (since a property path
   * cannot both depend and not depend on a pre-processor, no property path deduplication is necessary).
   */
  readonly propertyAccessCost: number

  /**
   * The sum of {@linkcode AnalyzedQueryRecordFilter.minimumValueMatchCost} and
   * {@linkcode AnalyzedPreProcessorDependantQueryRecordFilter.minimumValueMatchCost}. The matched properties included
   * in the sum are not deduplicated, as every property match needs to be applied individually.
   */
  readonly minimumValueMatchCost: number

  /**
   * The list of all query parameters used in {@linkcode AnalyzedQueryRecordFilter.valueMatchParameters} and
   * {@linkcode AnalyzedPreProcessorDependantQueryRecordFilter.valueMatchParameters}, in the matching order. The query
   * parameters are not deduplicated, so that their value matching costs are accounted for every value matching they
   * are used for.
   */
  readonly valueMatchParameters: readonly QueryParameter[]
}
