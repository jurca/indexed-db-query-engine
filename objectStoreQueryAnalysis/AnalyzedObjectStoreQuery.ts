// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AnalyzedFilter from '../queryAnalysis/AnalyzedFilter.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AnalyzedOrderBy from '../queryAnalysis/AnalyzedOrderBy.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AnalyzedUniqueValueConstraints from '../queryAnalysis/AnalyzedUniqueValueConstraints.js'
import AnalyzedQuery from '../queryAnalysis/AnalyzedQuery.js'
import RecordOp from '../uop/RecordOp.js'
import AnalyzedObjectStoreFilter from './AnalyzedObjectStoreFilter.js'
import AnalyzedObjectStoreUniqueValueConstraints from './AnalyzedObjectStoreUniqueValueConstraints.js'
import AnalyzedObjectStoreOrderBy from './AnalyzedObjectStoreOrderBy.js'

/**
 * The result of further analysis of a generally-analyzed query in the context of an specific
 * {@linkcode IDBObjectStore} specified in the {@linkcode objectStoreName} property. The query engine may cache and
 * reuse this analysis result as long as the primary key and indexes of the object store remain unmodified.
 *
 * Note that any query properties that are not affected by the analysis are left out on purpose, and are still
 * accessible through the {@linkcode query} property.
 *
 * @template S The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed.
 * @template I The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
 *           all pre-processors applied.
 * @template R The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
 *           all pre-processors and post-processors applied.
 */
export default interface AnalyzedObjectStoreQuery<S, I = S, R = I> {
  /**
   * The query that has been analyzed for execution on the object store specified by {@linkcode objectStoreName}.
   */
  readonly query: AnalyzedQuery<S, I, R>

  /**
   * The name of the IndexedDB database containing the object store on which this query has been analyzed.
   */
  readonly databaseName: string

  /**
   * The name of the object store on which this query can be executed. This query has been analyzed for execution on
   * the specified object store only and is not meant to be compatible with any other object store (unless it has the
   * same primary key and matching indexes with matching properties).
   */
  readonly objectStoreName: string

  /**
   * The part of the largest common denominator of all record matching patterns in the original query that is not
   * pre-processor dependant (the {@linkcode AnalyzedFilter.indexable} part of {@linkcode AnalyzedQuery.mainFilter})
   * split into parts that can use the primary key or indexes of the object store denoted by
   * {@linkcode objectStoreName}, and the rest.
   *
   * The keys of the map are index names or `null` if referring to the object store's primary key, the values are the
   * analysis results for the given index or primary key specified by the map key.
   */
  readonly mainFilter: ReadonlyMap<string | null, AnalyzedObjectStoreFilter<S>>

  /**
   * The {@linkcode AnalyzedFilter.indexable} part of {@linkcode AnalyzedQuery.additionalFilterAlternatives} further
   * split down into patterns that can use the primary key or indexes of the object store denoted by
   * {@linkcode objectStoreName}, and the rest.
   *
   * The keys of the map are index names or `null` if referring to the object store's primary key, the values are the
   * analysis results for the given index or primary key specified by the map key. A single analysis result represents
   * a set of record matching patterns, a record needs to match at least one of the given patterns to be included in
   * the query result.
   */
  readonly additionalFilterAlternatives: ReadonlyMap<string | null, readonly AnalyzedObjectStoreFilter<S>[]>

  /**
   * The {@linkcode AnalyzedUniqueValueConstraints.indexable} part of {@linkcode AnalyzedQuery.onlyUnique} further split
   * down into constraints that can use the primary key or indexes of the object store denoted by
   * {@linkcode objectStoreName}, and the rest.
   *
   * The keys of the map are index names or `null` if referring to the object store's primary key, the values are the
   * analysis results for the given index or primary key specified by the map key.
   */
  readonly onlyUnique: ReadonlyMap<string | null, AnalyzedObjectStoreUniqueValueConstraints<S>>

  /**
   * The {@linkcode AnalyzedOrderBy.indexable} part of {@linkcode AnalyzedQuery.orderBy} further split down into a
   * prefix that can use the primary key or indexes of the object store denoted by {@linkcode objectStoreName}, and the
   * rest.
   *
   * The keys of the map are index names or `null` if referring to the object store's primary key, the values are the
   * analysis results for the given index or primary key specified by the map key.
   */
  readonly orderBy: ReadonlyMap<string | null, AnalyzedObjectStoreOrderBy<S>>

  /**
   * Record processing micro-program that applies the non-indexable parts of the {@linkcode mainFilter} and
   * {@linkcode onlyUnique} record constraints.
   *
   * The order of the operations is optimized for applying the cheapest operations (e.g. accessing shallowest
   * properties) first so that the more expensive operations are more likely to be executed less often, in order to
   * improve the overall performance of query execution.
   *
   * The query engine may chain this program with other programs together before executing it. This micro-program is
   * expected to be executed before executing {@linkcode AnalyzedQuery.mainFilteringOps}, but the query engine may
   * choose to further reorder or otherwise modify these programs, their order of execution or the order of their
   * operations (while guaranteeing that the query result will remain the same).
   *
   * The keys of the map are index names or `null` if referring to the object store's primary key, the values are the
   * micro-programs to use for the given index or primary key specified by the map key.
   */
  readonly mainFilteringOps: ReadonlyMap<string | null, readonly RecordOp[]>

  /**
   * Record processing micro-program that applies the non-indexable part of the
   * {@linkcode additionalFilterAlternatives} record constraints.
   *
   * The order of the operations is optimized for applying the cheapest operations (e.g. prioritizing the patters with
   * the least amount of property constraints and accessing the shallowest properties) first so that the more expensive
   * operations are more likely to be executed less often, in order to improve the overall performance of query
   * execution.
   *
   * The query engine may chain this program with other programs together before executing it. This micro-program is
   * expected to be executed right after {@linkcode mainFilteringOps} and before
   * {@linkcode AnalyzedQuery.mainFilteringOps} because testing against multiple patterns is expected to be more
   * computationally expensive than testing against a single pattern and applying record pre-processors is expected to
   * be even more expensive. However, the query engine may choose to further reorder or otherwise modify these
   * programs, their order of execution or the order of their operations (while guaranteeing that the query result will
   * remain the same).
   *
   * The keys of the map are index names or `null` if referring to the object store's primary key, the values are the
   * micro-programs to use for the given index or primary key specified by the map key.
   */
  readonly additionalFilteringOps: ReadonlyMap<string | null, readonly RecordOp[]>
}
