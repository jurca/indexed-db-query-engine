import AnalyzedQueryRecordFilter from '../queryAnalysis/AnalyzedQueryRecordFilter.js'
import QueryParameter from '../QueryParameter.js'

/**
 * Result of analysis of a query filter that describes which parts of the filter can be executed using an object
 * store's indexes or primary key and which parts cannot.
 *
 * @template R The type of records stored in the {@linkcode IDBObjectStore} on which the filter will be applied.
 */
export default interface AnalyzedObjectStoreFilter<R> {
  /**
   * The name of the object store's index to which this analysis result applies. Set to `null` if this analysis result
   * applies to using the object store's primary key.
   */
  readonly indexName: string | null

  /**
   * The part of the analyzed filter that can be matched using the given index or object store's primary key.
   */
  readonly indexable: AnalyzedQueryRecordFilter<R>

  /**
   * The part of the analyzed filter that cannot be matched using the given index or object store's primary. This part
   * of the filter will be applied by the query engine.
   */
  readonly nonIndexable: AnalyzedQueryRecordFilter<R>

  /**
   * The sum of the {@linkcode minimumPropertyAccessCost}, {@linkcode minimumValueMatchCost} and
   * {@linkcode valueMatchParameters.length} properties. The actual execution cost may be higher depending on the query
   * parameters used.
   *
   * This cost estimate does not include the indexable part of this filter because its cost will depend on the indexes
   * that will be utilized during query execution.
   */
  readonly minimumEstimatedCost: number

  /**
   * The total expected execution cost of accessing all properties in the {@linkcode nonIndexable} part of this filter.
   * This property mirrors the {@linkcode AnalyzedQueryRecordFilter.propertyAccessCost} property of the
   * {@linkcode nonIndexable} part of this filter.
   *
   * This cost estimate does not include the indexable part of this filter because its cost will depend on the indexes
   * that will be utilized during query execution.
   */
  readonly minimumPropertyAccessCost: number

  /**
   * This property mirrors the {@linkcode AnalyzedQueryRecordFilter.minimumValueMatchCost} of the
   * {@linkcode nonIndexable} part of this filter.
   *
   * This cost estimate does not include the indexable part of this filter because its cost will depend on the indexes
   * that will be utilized during query execution.
   */
  readonly minimumValueMatchCost: number

  /**
   * This property mirrors the {@linkcode AnalyzedQueryRecordFilter.valueMatchParameters} property of the
   * {@linkcode nonIndexable} part of this filter. The query parameters are not deduplicated, so that their value
   * matching costs are accounted for every value matching they are used for.
   *
   * This cost estimate does not include the indexable part of this filter because its cost will depend on the indexes
   * that will be utilized during query execution.
   */
  readonly valueMatchParameters: readonly QueryParameter[]
}
