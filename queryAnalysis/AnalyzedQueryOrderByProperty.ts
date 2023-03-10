import QueryOrderBy from '../QueryOrderBy.js'

/**
 * Desired ordering of records by values of their property denoted by a property path, with analyzed and estimated
 * execution cost.
 *
 * @template R The type of the records to sort.
 */
export default interface AnalyzedQueryOrderByProperty<R> {
  /**
   * The property by which records should be sorted and how the records should be sorted.
   */
  readonly orderByProperty: QueryOrderBy<R>

  /**
   * Estimated cost of accessing the property referenced by the {@linkcode orderByProperty}. This is calculated as the
   * length of the {@linkcode QueryOrderBy.propertyPath}.
   */
  readonly propertyAccessCost: number
}
