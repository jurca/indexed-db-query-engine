// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RecordPropertyProcessor from '../RecordPropertyProcessor.js'
import AnalyzedQueryUniqueValueConstraint from './AnalyzedQueryUniqueValueConstraint.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AnalyzedRecordPropertyProcessor from './AnalyzedRecordPropertyProcessor.js'
import PreProcessorDependantQueryUniqueValueConstraint from './PreProcessorDependantQueryUniqueValueConstraint.js'

/**
 * Record filtering based on requiring unique values in specified properties that has been analyzed to identify the
 * constraints that can be applied using object store indexes (if such indexes exist as least partially).
 *
 * @template S The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed.
 * @template I The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
 *           all pre-processors applied.
 */
export default interface AnalyzedUniqueValueConstraints<S, I> {
  /**
   * Requirements for unique values of the specified record properties that are not affected by the query's record
   * pre-processors, and therefore can be applied using indexes.
   */
  readonly indexable: readonly AnalyzedQueryUniqueValueConstraint<S>[]

  /**
   * Requirements for unique values of the specified record properties that are dependant on the results of the query's
   * record pre-processors.
   */
  readonly preProcessorDependant: readonly PreProcessorDependantQueryUniqueValueConstraint<S, I>[]

  /**
   * The sum of the {@linkcode preProcessingCost} and {@linkcode propertyAccessCost} properties. The actual execution
   * cost may be higher depending on the pre-processors used.
   */
  readonly minimalEstimatedCost: number

  /**
   * The estimated minimal execution cost of deduplicated pre-processors referenced by
   * {@linkcode PreProcessorDependantQueryUniqueValueConstraint.preProcessor}s and (transitively) their dependencies
   * referenced by {@linkcode AnalyzedRecordPropertyProcessor.dependsOn} in the {@linkcode preProcessorDependant}
   * constraints.
   *
   * The cost is estimated as `I + O + C`, where `I` is the sum of {@linkcode RecordPropertyProcessor.input.length} of
   * deduplicated {@linkcode RecordPropertyProcessor.input} paths, `O` is the sum of
   * {@linkcode RecordPropertyProcessor.output.length} of deduplicated {@linkcode RecordPropertyProcessor.output} paths
   * and `C` the total number of pre-processors affecting record filtering by unique values (as defined above).
   *
   * This formula is based on the assumption that query engine takes into account the dependencies between property
   * pre-processors, and per record resolves input values only once, writes output values only once, and uses a cache
   * for output values used as input by dependant pre-processors.
   */
  readonly preProcessingCost: number

  /**
   * The sum of {@linkcode AnalyzedQueryUniqueValueConstraint.propertyAccessCost} of all constraints in
   * {@linkcode indexable} and {@linkcode preProcessorDependant} constraints.
   *
   * Note that no deduplication is necessary since required-to-be-unique properties are already deduplicated by the
   * query analyzer.
   */
  readonly propertyAccessCost: number
}
