import QueryParameter from '../QueryParameter.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RecordPropertyProcessor from '../RecordPropertyProcessor.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AnalyzedQueryRecordPropertyFilter from './AnalyzedQueryRecordPropertyFilter.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AnalyzedRecordPropertyProcessor from './AnalyzedRecordPropertyProcessor.js'
import PreProcessorDependantQueryRecordPropertyFilter from './PreProcessorDependantQueryRecordPropertyFilter.js'

/**
 * Descriptor of a pre-processor dependant record matching pattern with an execution cost estimate. All of the
 * filtering {@linkcode properties} must match for the record at hand to pass the filter.
 *
 * @template S The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed.
 * @template I The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
 *           all pre-processors applied.
 */
export default interface AnalyzedPreProcessorDependantQueryRecordFilter<S, I> {
  /**
   * A set of property paths, the pre-processors they depend on and desired values ranges of record properties denoted
   * by the respective property paths, along with their respective cost estimates.
   */
  readonly properties: readonly PreProcessorDependantQueryRecordPropertyFilter<S, I>[]

  /**
   * The estimated minimal execution cost of deduplicated pre-processors referenced by
   * {@linkcode PreProcessorDependantQueryRecordPropertyFilter.preProcessor}s and (transitively) their dependencies
   * referenced by {@linkcode AnalyzedRecordPropertyProcessor.dependsOn} in the {@linkcode properties} filter.
   *
   * The cost is estimated as `I + O + C`, where `I` is the sum of {@linkcode RecordPropertyProcessor.input.length} of
   * deduplicated {@linkcode RecordPropertyProcessor.input} paths, `O` is the sum of
   * {@linkcode RecordPropertyProcessor.output.length} of deduplicated {@linkcode RecordPropertyProcessor.output} paths
   * and `C` the total number of pre-processors affecting sorting (as defined above).
   *
   * This formula is based on the assumption that query engine takes into account the dependencies between property
   * pre-processors, and per record resolves input values only once, writes output values only once, and uses a cache
   * for output values used as input by dependant pre-processors.
   */
  readonly preProcessingCost: number

  /**
   * The total expected execution cost of accessing all properties in the {@linkcode properties} array. This is
   * computed by summing up the {@linkcode AnalyzedQueryRecordPropertyFilter.propertyAccessCost} properties after
   * deduplicating property filters by their property paths (the query engine needs to resolve a property value only
   * once to match it against multiple {@linkcode IDBKeyRange}s).
   */
  readonly propertyAccessCost: number

  /**
   * The sum of non-null {@linkcode AnalyzedQueryRecordPropertyFilter.valueMatchCost}s of {@linkcode properties}.
   * Unlike {@linkcode propertyAccessCost}, the properties included in the sum are not deduplicated, as every property
   * match needs to be applied individually.
   */
  readonly minimumValueMatchCost: number

  /**
   * The list of all query parameters used in {@linkcode properties} constraints, in the matching order. The query
   * parameters are not deduplicated, so that their value matching costs are accounted for every value matching they
   * are used for.
   */
  readonly valueMatchParameters: readonly QueryParameter[]
}
