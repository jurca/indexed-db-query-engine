import PropertyPath from './PropertyPath.js'
import QueryParameter from './QueryParameter.js'

/**
 * Descriptor of records filter specifying filtering by a single specific record property and the desired property
 * values.
 *
 * @template R The type of the record on which the filter is to be applied.
 */
export default interface QueryRecordPropertyFilter<R> {
  /**
   * Property path denoting a property of the records by which's values the records are to be filtered. The referenced
   * property's value must be a valid key value, otherwise the record will not be included in the query's results.
   * 
   * @see {@linkcode IDBKeyRange}
   * @see {@linkcode IDBValidKey}
   */
  readonly propertyPath: PropertyPath<R>

  /**
   * The desired range of values of the record property denoted by the {@linkcode propertyPath}.
   */
  readonly valueRange: IDBKeyRange | QueryParameter

  /**
   * If `true` and {@linkcode propertyPath} resolves to an array, the record will be matched against the
   * {@linkcode valueRange} for each item in the resolved array and added to the query result for each match (record
   * deduplication will be applied afterwards).
   */
  readonly expandMultiEntry: boolean
}
