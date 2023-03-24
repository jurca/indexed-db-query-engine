// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RecordPropertyProcessor from '../RecordPropertyProcessor.js'
import AnalyzedQueryOrderByProperty from './AnalyzedQueryOrderByProperty.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AnalyzedRecordPropertyProcessor from './AnalyzedRecordPropertyProcessor.js'
import PreProcessorDependantQueryOrderBy from './PreProcessorDependantQueryOrderBy.js'

/**
 * Record ordering specification that has been analyzed to identify sorting clauses that can be applied by utilizing
 * object store indexes (if such indexes exist at least partially).
 *
 * @template S The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed.
 * @template I The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
 *           all pre-processors applied.
 */
export default interface AnalyzedOrderBy<S, I> {
  /**
   * Record ordering that is independent of any of the query's record pre-processors. The query engine may therefore
   * utilize an object store's primary key and/or its indexes to execute the desired record sorting (at least
   * partially, depends on the query and object store at hand).
   */
  readonly indexable: readonly AnalyzedQueryOrderByProperty<S>[]

  /**
   * Record ordering that is dependant on at least one of the query's record pre-processors. Since records are ordered
   * by these ordering specifications lexicographically, this array contains every item since the first that would be
   * affected by a record pre-processor.
   */
  readonly preProcessorDependant: readonly PreProcessorDependantQueryOrderBy<S, I>[]

  /**
   * The sum of the {@linkcode preProcessingCost} and {@linkcode minimumPropertyAccessCost} properties. The actual
   * execution cost may be higher depending on the pre-processors used.
   *
   * This cost estimate does not include the indexable part of this record ordering specification because its cost will
   * depend on the indexes that will be utilized during query execution.
   */
  readonly minimumEstimatedCost: number

  /**
   * The estimated minimum execution cost of deduplicated pre-processors referenced by
   * {@linkcode PreProcessorDependantQueryOrderBy.preProcessor}s and (transitively) their dependencies referenced by
   * {@linkcode AnalyzedRecordPropertyProcessor.dependsOn} in the {@linkcode preProcessorDependant} record ordering.
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
   * The sum of {@linkcode AnalyzedQueryOrderByProperty.propertyAccessCost} of all record ordering properties listed in
   * {@linkcode PreProcessorDependantQueryOrderBy.orderBy} properties in the {@linkcode preProcessorDependant}
   * property.
   *
   * Note that no deduplication is necessary since ordering properties are already deduplicated by the query analyzer.
   *
   * This cost estimate does not include the indexable part of this record ordering specification because its cost will
   * depend on the indexes that will be utilized during query execution.
   */
  readonly minimumPropertyAccessCost: number
}
