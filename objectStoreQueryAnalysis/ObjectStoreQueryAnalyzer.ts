import AnalyzedQuery from '../queryAnalysis/AnalyzedQuery.js'
import AnalyzedObjectStoreQuery from './AnalyzedObjectStoreQuery.js'

/**
 * Query analyzer and optimizer that performs query analysis and optimization based on the {@linkcode IDBObjectStore}
 * passed along with the query to analyze.
 */
export default interface ObjectStoreQueryAnalyzer {
  /**
   * Performs query analysis and optimizations on the provided query in the context of the provided object store. The
   * analyzer performs at least the following operations:
   *
   * - Generating {@linkcode AnalyzedQuery.mainFilter} variants of the indexable part for every index and the primary
   *   key of the object store.
   * - Generating {@linkcode AnalyzedQuery.additionalFilterAlternatives} variants of the indexable part for every index
   *   and the primary key of the object store.
   * - Generating {@linkcode AnalyzedQuery.onlyUnique} variants of the indexable part for every index and the primary
   *   key of the object store.
   * - Generating {@linkcode AnalyzedQuery.orderBy} variants of the indexable part for every index and the primary key
   *   of the object store.
   *
   * @template S The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed.
   * @template I The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
   *           all pre-processors applied.
   * @template R The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
   *           all pre-processors and post-processors applied.
   * @param objectStore The IndexedDB object store providing context on how the query will be analyzed and optimized.
   * @param query The query to analyze. The query will not be modified.
   * @returns Result of the analyses of the provided query. The query engine may cache the result until the object
   *          store's properties or indexes are modified.
   */
  <S, I, R>(objectStore: IDBObjectStore, query: AnalyzedQuery<S, I, R>): AnalyzedObjectStoreQuery<S, I, R>
}
