// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AnalyzedObjectStoreFilter from '../objectStoreQueryAnalysis/AnalyzedObjectStoreFilter.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AnalyzedObjectStoreUniqueValueConstraints
  from '../objectStoreQueryAnalysis/AnalyzedObjectStoreUniqueValueConstraints.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AnalyzedObjectStoreOrderBy from '../objectStoreQueryAnalysis/AnalyzedObjectStoreOrderBy.js'
import AnalyzedObjectStoreQuery from '../objectStoreQueryAnalysis/AnalyzedObjectStoreQuery.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AnalyzedQuery from '../queryAnalysis/AnalyzedQuery.js'
import RecordOp from '../uop/RecordOp.js'

/**
 * A specific plan on how to execute a query on an object store using either one of its indexes or its primary key.
 *
 * @template S The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed.
 * @template I The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
 *           all pre-processors applied.
 * @template R The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
 *           all pre-processors and post-processors applied.
 */
export default interface QueryExecutionPlan<S, I = S, R = I> {
  /**
   * The query that has been analyzed for execution and to which this execution plan applies.
   */
  readonly query: AnalyzedObjectStoreQuery<S, I, R>

  /**
   * The name of the object store's index to which this execution plan applies, or `null` if the plan is meant to be
   * executed on the object store itself.
   */
  readonly indexName: string | null

  /**
   * The key range with which the internal cursor will be created by the query engine to execute this query execution
   * plan.
   *
   * @see IDBObjectStore.openCursor
   */
  readonly cursorKeyRange: IDBKeyRange | null

  /**
   * The iteration direction with which the internal cursor will be created by the query engine to execute this query
   * execution plan.
   *
   * @see IDBObjectStore.openCursor
   */
  readonly cursorDirection: IDBCursorDirection

  /**
   * Record processing micro-program that applies the part of query's record filtering constraints that cannot be
   * applied using the index selected in this execution plan.
   *
   * This program combines the {@linkcode AnalyzedObjectStoreQuery.mainFilteringOps} with
   * {@linkcode AnalyzedQuery.mainFilteringOps}, {@linkcode AnalyzedObjectStoreQuery.additionalFilteringOps} and
   * {@linkcode AnalyzedQuery.additionalFilteringOps}, in is the result of running program optimizer on the
   * concatenated intermediate program. The program includes only the ops from {@linkcode AnalyzedObjectStoreQuery}
   * that are meant to be used with the index this execution plan is meant for.
   */
  readonly filteringOps: readonly RecordOp[]

  /**
   * This property is a convenience accessor for the {@linkcode AnalyzedQuery.preSortingOps} from
   * {@linkcode AnalyzedObjectStoreQuery.query} from {@linkcode query}. These operations are applied on records that
   * passed the filtering stage right before they are sorted.
   *
   * @see AnalyzedQuery.preSortingOps
   */
  readonly preSortingOps: readonly RecordOp[]

  /**
   * This property is a convenience accessor for the {@linkcode AnalyzedQuery.postProcessingOps} from
   * {@linkcode AnalyzedObjectStoreQuery.query} from {@linkcode query}. These operations are applied on records after
   * they have been sorted.
   *
   * @see AnalyzedQuery.postProcessingOps
   */
  readonly postProcessingOps: readonly RecordOp[]

  /**
   * The sum of the {@linkcode estimatedFilteringCost} and {@linkcode AnalyzedQuery.minimumEstimatedPostProcessingCost}
   * properties, and the value of the {@linkcode estimatedSortingCost} property multiplied by its base-2 logarithm,
   * representing an estimate on how costly an execution of the {@linkcode query} would be using the specified object
   * store index or primary key.
   */
  readonly estimatedCost: number

  /**
   * The of the following properties:
   *
   * - {@linkcode AnalyzedObjectStoreFilter.minimumEstimatedCost} values from
   *   {@linkcode AnalyzedObjectStoreQuery.mainFilter} and
   *   {@linkcode AnalyzedObjectStoreQuery.additionalFilterAlternatives} entries for the index used in this execution
   *   plan.
   * - {@linkcode AnalyzedObjectStoreUniqueValueConstraints.minimumPropertyAccessCost} value from
   *   {@linkcode AnalyzedObjectStoreQuery.onlyUnique} from {@linkcode query}.
   * - {@linkcode AnalyzedQuery.minimumEstimatedFilteringCost} from {@linkcode AnalyzedObjectStoreQuery.query} from
   *   {@linkcode query}.
   */
  readonly estimatedFilteringCost: number

  /**
   * The sum of {@linkcode AnalyzedObjectStoreOrderBy.minimumPropertyAccessCost} property from
   * {@linkcode AnalyzedObjectStoreQuery.orderBy} entry for the index used in this execution plan from
   * {@linkcode query}, and {@linkcode AnalyzedQuery.minimumEstimatedSortingCost} from
   * {@linkcode AnalyzedObjectStoreQuery.query} from {@linkcode query}.
   */
  readonly estimatedSortingCost: number
}
