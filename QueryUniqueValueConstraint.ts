import PropertyPath from './PropertyPath.js'

/**
 * Query constraint requiring unique values in records matched by the query at a single specific property path.
 *
 * @template R The type of the record to have the value of the denoted property tested for uniqueness.
 */
export default interface QueryUniqueValueConstraint<R> {
  /**
   * Property path denoting a property which's value will be required to be unique amongst the records matched by the
   * query for the record to be included in the result.
   */
  readonly propertyPath: PropertyPath<R>

  /**
   * If `true` and {@linkcode propertyPath} resolves to an array, the record will be tested for the given property's
   * value uniqueness for every item in the resolved array. Every value deemed unique amongst the records matched by
   * the query so far will result in adding the record, even repeatedly, to records matched by the query (record
   * deduplication will be applied afterwards).
   */
  readonly expandMultiEntry: boolean
}
