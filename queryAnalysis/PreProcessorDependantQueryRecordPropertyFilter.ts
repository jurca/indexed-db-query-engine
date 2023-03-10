import AnalyzedQueryRecordPropertyFilter from './AnalyzedQueryRecordPropertyFilter.js'
import AnalyzedRecordPropertyProcessor from './AnalyzedRecordPropertyProcessor.js'

/**
 * A wrapper of a record property filter, carrying also the reference to the pre-processor on which's outcome the
 * filter depends. This is used by the query engine to estimate the overall cost of applying this filter on a record,
 * and prioritize filter execution order accordingly.
 *
 * @template S The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed.
 * @template I The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
 *           all pre-processors applied.
 */
export default interface PreProcessorDependantQueryRecordPropertyFilter<S, I> {
  /**
   * The record property filter that depends on the outcome of the record property pre-processor referenced by
   * {@linkcode preProcessor}.
   */
  readonly propertyFilter: AnalyzedQueryRecordPropertyFilter<I>

  /**
   * The property pre-processor of which's outcome the {@linkcode propertyFilter} depends on.
   *
   * This property always references the last record pre-processor affecting the referenced property's value in the
   * chain of pre-processors affecting each other's inputs. The previous pre-processors in the chain can be accessed
   * through the {@linkcode AnalyzedRecordPropertyProcessor.dependsOn} property.
   */
  readonly preProcessor: AnalyzedRecordPropertyProcessor<S, I>
}
