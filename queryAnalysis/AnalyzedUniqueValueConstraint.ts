import QueryUniqueValueConstraint from '../QueryUniqueValueConstraint.js'
import PreProcessorDependantQueryUniqueValueConstraint from './PreProcessorDependantQueryUniqueValueConstraint.js'

/**
 * Record filtering based on requiring unique values in specified properties that has been analyzed to identify the
 * constraints that can be applied using object store indexes (if such indexes exist as least partially).
 */
export default interface AnalyzedUniqueValueConstraint<S, I> {
  /**
   * Requirements for unique values of the specified record properties that are not affected by the query's record
   * pre-processors, and therefore can be applied using indexes.
   */
  readonly indexable: readonly QueryUniqueValueConstraint<S>[]

  /**
   * Requirements for unique values of the specified record properties that are dependant on the results of the query's
   * record pre-processors.
   */
  readonly preProcessorDependant: readonly PreProcessorDependantQueryUniqueValueConstraint<S, I>[]
}
