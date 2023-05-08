import Query from './Query.js'
import PreparedQuery from './queryPreparation/PreparedQuery.js'

declare global {
  interface IDBObjectStore {
    /**
     * Analyzes and prepares the provided query for faster execution. The prepared query can be persistently cached by
     * the query engine until the object store's properties or indexes change.
     * 
     * @template S The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed.
     * @template I The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed,
     *           with all pre-processors applied.
     * @template R The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed,
     *           with all pre-processors and post-processors applied.
     * @param query The query to prepare for execution.
     * @returns Representation of the provided query that is prepared for execution.
     */
    prepareQuery<S, I, R>(query: Partial<Query<S, I, R>>): PreparedQuery<S, I, R>

    /**
     * Opens a new cursor for traversing results of the provided query.
     *
     * If a {@linkcode Query} is provided, the query is first analyzed, optimized and prepared, and the query engine
     * may choose to cache the prepared query until the object store's properties or indexes change.
     *
     * @param query The query to execute on this object store.
     * @see prepareQuery
     * @returns Request that resolves to a cursor for traversing the query's results, with the result records provided
     *          in cursor's {@linkcode IDBCursorWithValue.value} one at a time.
     */
    query<S, I, R>(query: Partial<Query<S, I, R>> | PreparedQuery<S, I, R>): IDBRequest<IDBCursorWithValue | null>

    /**
     * Retrieves the values of the records matching the given key or key range in query, or the provided
     * {@linkcode Query} or {@linkcode PreparedQuery} (up to count if given).
     *
     * If successful, request's result will be an {@linkcode Array} of the values.
     *
     * @param query The query to use to match records.
     * @param count The maximum number of records to retrieve. This overrides the {@linkcode Query.recordLimit}
     *        property if provided.
     * @returns Request that resolves to the matched records.
     */
    getAll<S, I, R>(
      query?: Partial<Query<S, I, R>> | PreparedQuery<S, I, R> | IDBValidKey | IDBKeyRange | null,
      count?: number,
    ): IDBRequest<R[]>

    /**
     * Retrieves the keys of records matching the given key or key range in query , or the provided {@linkcode Query}
     * or {@linkcode PreparedQuery} (up to count if given).
     *
     * If successful, request's result will be an {@linkcode Array} of the keys.
     *
     * @param query The query to use to match records.
     * @param count The maximum number of records to retrieve. This overrides the {@linkcode Query.recordLimit}
     *        property if provided.
     * @returns Request that resolves to the keys of the matched records.
     */
    getAllKeys<S, I, R>(
      query?: Partial<Query<S, I, R>> | PreparedQuery<S, I, R> | IDBValidKey | IDBKeyRange | null,
      count?: number,
    ): IDBRequest<IDBValidKey[]>
  }
}
