import AnalyzedQueryOrderByProperty from './AnalyzedQueryOrderByProperty.js'
import AnalyzedRecordPropertyProcessor from './AnalyzedRecordPropertyProcessor.js'

/**
 * A wrapper of a record ordering by a single record property specification, carrying also the reference to the
 * pre-processor on which's outcome the ordering depends. This is used by the query engine to estimate the overall cost
 * of sorting by the specified property, and total estimated cost of sorting the records first vs filtering them first.
 *
 * @template S The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed.
 * @template I The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
 *           all pre-processors applied.
 */
export default interface PreProcessorDependantQueryOrderBy<S, I> {
  /**
   * Specification of record ordering by a single record property values. The ordering is dependant either on the
   * outcome of the pre-processor referenced in the {@linkcode preProcessor} property, or this ordering is affected by
   * a different pre-processor-affected property that is used to sort record before sorting by this property is
   * applied.
   */
  readonly orderBy: AnalyzedQueryOrderByProperty<I>

  /**
   * The property pre-processor of which's outcome the {@linkcode orderBy} depends on. This property is {@code null}
   * iff the property itself is not dependant on any pre-processor, but the ordering is (because of another ordering
   * specification used to compare records before this one, that is dependant on a pre-processor).
   *
   * This property always references the last record pre-processor affecting the referenced property's value in the
   * chain of pre-processors affecting each other's inputs. The previous pre-processors in the chain can be accessed
   * through the {@linkcode AnalyzedRecordPropertyProcessor.dependsOn} property.
   */
   readonly preProcessor: AnalyzedRecordPropertyProcessor<S, I> | null
}
