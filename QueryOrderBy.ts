import OrderByDirection from './OrderByDirection.js'
import PropertyPath from './PropertyPath.js'

/**
 * Desired ordering of records by values of their property denoted by a property path.
 *
 * @template R The type of the records to sort.
 */
export default interface QueryOrderBy<R> {
  /**
   * Property path denoting a property of the records which's value will be used to order the records. The referenced
   * property's value must be a valid key value, otherwise the record will not be included in the query's results.
   * 
   * @see {@linkcode IDBKeyRange}
   * @see {@linkcode IDBValidKey}
   */
  readonly propertyPath: PropertyPath<R>

  /**
   * The direction in which values of the record properties denoted by the {@linkcode propertyPath} are expected to
   * monotonically change (increase or decrease).
   */
  readonly direction: OrderByDirection

  /**
   * If `true` and {@linkcode propertyPath} resolves to an array, the record will be sorted into result repeatedly,
   * once per every item in the resolved array (record deduplication will be applied afterwards).
   */
  readonly expandMultiEntry: boolean
}
