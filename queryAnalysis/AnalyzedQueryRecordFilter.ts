import QueryParameter from '../QueryParameter'
import AnalyzedQueryRecordPropertyFilter from './AnalyzedQueryRecordPropertyFilter'

/**
 * Descriptor of a record matching pattern with an execution cost estimate. All of the filtering {@linkcode properties}
 * must match for the record at hand to pass the filter.
 *
 * @template R The type of the record on which the filter is to be applied.
 */
export default interface AnalyzedQueryRecordFilter<R> {
  /**
   * A set of property paths and desired values ranges of record properties denoted by the respective property paths,
   * along with their respective cost estimates.
   */
  readonly properties: readonly AnalyzedQueryRecordPropertyFilter<R>[]

  /**
   * The total expected execution cost of accessing all properties in the {@linkcode properties} array. This is
   * computed by summing up the {@linkcode AnalyzedQueryRecordPropertyFilter.propertyAccessCost} properties after
   * deduplicating property filters by their property paths (the query engine needs to resolve a property value only
   * once to match it against multiple {@linkcode IDBKeyRange}s).
   */
  readonly propertyAccessCost: number

  /**
   * The sum of non-null {@linkcode AnalyzedQueryRecordPropertyFilter.valueMatchCost}s of {@linkcode properties}.
   * Unlike {@linkcode propertyAccessCost}, the properties included in the sum are not deduplicated, as every property
   * match needs to be applied individually.
   */
  readonly minimumValueMatchCost: number

  /**
   * The list of all query parameters used in {@linkcode properties} constraints, in the matching order. The query
   * parameters are not deduplicated, so that their value matching costs are accounted for every value matching they
   * are used for.
   */
  readonly valueMatchParameters: readonly QueryParameter[]
}
