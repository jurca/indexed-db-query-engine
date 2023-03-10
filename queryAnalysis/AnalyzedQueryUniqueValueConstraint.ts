import QueryUniqueValueConstraint from '../QueryUniqueValueConstraint.js'

/**
 * Query constraint requiring unique values in records matched by the query at a single specific property path that had
 * its execution cost analyzed.
 *
 * @template R The type of the record to have the value of the denoted property tested for uniqueness.
 */
export default interface AnalyzedQueryUniqueValueConstraint<R> {
  /**
   * The requirement for unique values of a specific record property.
   */
  readonly constraint: QueryUniqueValueConstraint<R>

  /**
   * Estimated cost of accessing the property referenced by the {@linkcode constraint}. This is calculated as the
   * length of the {@linkcode QueryUniqueValueConstraint.propertyPath}.
   */
  readonly propertyAccessCost: number
}
