import PropertyPath from './PropertyPath.js'

/**
 * Descriptor of records filter specifying filtering by a single specific record property and the desired property
 * values.
 */
export default interface QueryRecordPropertyFilter<R> {
  /**
   * Property path denoting a property of the records by which's values the records are to be filtered. The referenced
   * property's value must be a valid key value.
   * 
   * @see {@linkcode IDBKeyRange}
   * @see {@linkcode IDBValidKey}
   */
  readonly propertyPath: PropertyPath<R>

  /**
   * The desired range of values of the record property denoted by the {@linkcode propertyPath}.
   */
  readonly valueRange: IDBKeyRange

  /**
   * If `true` and {@linkcode propertyPath} resolves to an array, the record will be matched against the
   * {@linkcode valueRange} for each item in the resolved array and added to the query result for each match (record
   * deduplication will be applied afterwards).
   */
  readonly expandMultiEntry: boolean
}
