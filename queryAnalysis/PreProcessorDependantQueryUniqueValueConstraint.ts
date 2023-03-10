import AnalyzedQueryUniqueValueConstraint from './AnalyzedQueryUniqueValueConstraint.js'
import AnalyzedRecordPropertyProcessor from './AnalyzedRecordPropertyProcessor.js'

/**
 * A wrapper of a record property uniqueness requirement, carrying also the reference to the pre-processor on which's
 * outcome the uniqueness test result depends. This is used by the query engine to estimate the overall cost of
 * applying this constraint on a record, and prioritize filter execution order accordingly.
 *
 * @template S The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed.
 * @template I The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
 *           all pre-processors applied.
 */
export default interface PreProcessorDependantQueryUniqueValueConstraint<S, I> {
  /**
   * The record property value uniqueness requirement that is dependant on the outcome of the associated record
   * property pre-processor referenced by {@linkcode preProcessor}.
   */
  readonly valueConstraint: AnalyzedQueryUniqueValueConstraint<I>

  /**
   * The property pre-processor of which's outcome the {@linkcode valueConstraint} depends on.
   *
   * This property always references the last record pre-processor affecting the referenced property's value in the
   * chain of pre-processors affecting each other's inputs. The previous pre-processors in the chain can be accessed
   * through the {@linkcode AnalyzedRecordPropertyProcessor.dependsOn} property.
   */
  readonly preProcessor: AnalyzedRecordPropertyProcessor<S, I>
}
