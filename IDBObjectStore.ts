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
     * @param parameters Values for the query parameters used in the query. This can be omitted if the query does not
     *        use any query parameters.
     * @see prepareQuery
     * @returns Request that resolves to a cursor for traversing the query's results, with the result records provided
     *          in cursor's {@linkcode IDBCursorWithValue.value} one at a time.
     * @throws {DOMException} Thrown if the query is invalid or contains a parameter for which there is no provided
     *         value.
     */
    query<S, I, R>(
      query: Partial<Query<S, I, R>> | PreparedQuery<S, I, R>,
      parameters?: Record<string, unknown>,
    ): IDBRequest<IDBCursorWithValue | null>

    /**
     * Retrieves the values of the records matching the given key or key range in query, or the provided
     * {@linkcode Query} or {@linkcode PreparedQuery} (up to count if given).
     *
     * If successful, request's result will be an {@linkcode Array} of the values.
     *
     * @param query The query to use to match records.
     * @param count The maximum number of records to retrieve. This overrides the {@linkcode Query.recordLimit}
     *        property if provided.
     * @param parameters Values for the query parameters used in the query. This can be omitted if the query does not
     *        use any query parameters.
     * @returns Request that resolves to the matched records.
     * @throws {DOMException} Thrown if the query is invalid or contains a parameter for which there is no provided
     *         value.
     */
    getAll<S, I, R>(
      query?: Partial<Query<S, I, R>> | PreparedQuery<S, I, R> | IDBValidKey | IDBKeyRange | null,
      count?: number,
      parameters?: Record<string, unknown>,
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
     * @param parameters Values for the query parameters used in the query. This can be omitted if the query does not
     *        use any query parameters.
     * @returns Request that resolves to the keys of the matched records.
     * @throws {DOMException} Thrown if the query is invalid or contains a parameter for which there is no provided
     *         value.
     */
    getAllKeys<S, I, R>(
      query?: Partial<Query<S, I, R>> | PreparedQuery<S, I, R> | IDBValidKey | IDBKeyRange | null,
      count?: number,
      parameters?: Record<string, unknown>,
    ): IDBRequest<IDBValidKey[]>
  }
}
