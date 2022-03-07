import QueryUniqueValueConstraint from '../QueryUniqueValueConstraint.js'
import AnalyzedRecordPropertyProcessor from './AnalyzedRecordPropertyProcessor.js'

/**
 * A wrapper of a record property uniqueness requirement, carrying also the reference to the pre-processor on which's
 * outcome the uniqueness test result depends. This is used by the query engine to estimate the overall cost of
 * applying this constraint on a record, and prioritize filter execution order accordingly.
 */
export default interface PreProcessorDependantQueryUniqueValueConstraint<R, I> {
  /**
   * The record property value uniqueness requirement that is dependant on the outcome of the associated record
   * property pre-processor referenced by {@linkcode preProcessor}.
   */
  readonly valueConstraint: QueryUniqueValueConstraint<R>

  /**
   * The property pre-processor of which's outcome the {@linkcode valueConstraint} depends on.
   *
   * This property always references the last record pre-processor affecting the referenced property's value in the
   * chain of pre-processors affecting each other's inputs. The previous pre-processors in the chain can be accessed
   * through the {@linkcode AnalyzedRecordPropertyProcessor.dependsOn} property.
   */
  readonly preProcessor: AnalyzedRecordPropertyProcessor<I, R>
}
