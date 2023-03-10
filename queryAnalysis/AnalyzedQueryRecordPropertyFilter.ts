// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import QueryParameter from '../QueryParameter'
import QueryRecordPropertyFilter from '../QueryRecordPropertyFilter.js'

/**
 * Cost estimate of a {@linkcode QueryRecordPropertyFilter}.
 *
 * @template R The type of the record on which the filter is to be applied.
 */
export default interface AnalyzedQueryRecordPropertyFilter<R> {
  /**
   * The matching pattern for a single record property.
   */
  readonly recordPropertyFilter: QueryRecordPropertyFilter<R>

  /**
   * Estimated cost of accessing the property referenced by the {@linkcode recordPropertyFilter}. This is calculated as
   * the length of the {@linkcode QueryRecordPropertyFilter.propertyPath}.
   */
  readonly propertyAccessCost: number

  /**
   * Estimated cost of matching a value against the {@linkcode QueryRecordPropertyFilter.valueRange} specified by the
   * {@linkcode recordPropertyFilter}. The value is estimated to be `1` for a {@linkcode IDBKeyRange} matching against
   * a single value (matching a single specific value, lower-bound or upper-bound) or `2` for a {@linkcode IDBKeyRange}
   * matching against a range of values. The cost is set to `null` if the {@linkcode recordPropertyFilter} matches the
   * value against a {@linkcode QueryParameter}.
   */
  readonly valueMatchCost: number | null
}
