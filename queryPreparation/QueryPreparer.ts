import AnalyzedObjectStoreQuery from '../objectStoreQueryAnalysis/AnalyzedObjectStoreQuery.js'
import PreparedQuery from './PreparedQuery.js'

/**
 * Preparer of analyzed queries for execution on object stores.
 */
export default interface QueryPreparer {
  /**
   * Processes the provided analyzed query into a prepared query, so that it can be executed. The preparer always
   * generates execution plans for all indexes of the provided object store and for the object store itself.
   *
   * @template S The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed.
   * @template I The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
   *           all pre-processors applied.
   * @template R The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
   *           all pre-processors and post-processors applied.
   * @param objectStore The IndexedDB object store on which the query will be executed.
   * @param query The query to prepare. The query will not be modified.
   * @returns A query prepared for execution on the provided object store.
   */
  <S, I, R>(objectStore: IDBObjectStore, query: AnalyzedObjectStoreQuery<S, I, R>): PreparedQuery<S, I, R>
}
