// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AnalyzedObjectStoreOrderBy from '../objectStoreQueryAnalysis/AnalyzedObjectStoreOrderBy.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AnalyzedObjectStoreQuery from '../objectStoreQueryAnalysis/AnalyzedObjectStoreQuery.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AnalyzedQuery from '../queryAnalysis/AnalyzedQuery.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AnalyzedOrderBy from '../queryAnalysis/AnalyzedOrderBy.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AnalyzedQueryOrderByProperty from '../queryAnalysis/AnalyzedQueryOrderByProperty.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PreProcessorDependantQueryOrderBy from '../queryAnalysis/PreProcessorDependantQueryOrderBy.js'
import PreparedQuery from '../queryPreparation/PreparedQuery.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import QueryExecutionPlan from '../queryPreparation/QueryExecutionPlan.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import QueryExecutionContext from '../uop/executor/QueryExecutionContext.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import QueryProgramExecutorFactory from '../uop/executor/QueryProgramExecutorFactory.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RecordContext from '../uop/executor/RecordContext.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RecordProgramExecutorFactory from '../uop/executor/RecordProgramExecutorFactory.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Query from '../Query.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import QueryOrderBy from '../QueryOrderBy.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import QueryParameter from '../QueryParameter.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RecordDeduplicationMode from '../RecordDeduplicationMode.js'

/**
 * Executor of prepared queries, providing means of retrieval of records matched by a query.
 */
export default interface QueryExecutor {
  /**
   * Executes the provided query on the specified object store.
   *
   * While the query executor may optimize the process in various ways (e.g. it can resolve the returned
   * {@linkcode IDBRequest} with a cursor much sooner if no non-indexed-based record sorting is needed), it is
   * equivalent to executing the query using the following steps:
   *
   * - The query executor retrieves the {@linkcode QueryExecutionPlan} from the provided query that it assumes to
   *   perform the best. This is usually the {@linkcode PreparedQuery.preferredPlan}.
   * - The {@linkcode AnalyzedObjectStoreQuery} is retrieved from {@linkcode QueryExecutionPlan.query}.
   * - The {@linkcode AnalyzedQuery} is retrieved from {@linkcode AnalyzedObjectStoreQuery.query}.
   * - The {@linkcode Query} is retrieved from {@linkcode AnalyzedQuery.query}.
   * - Using the {@linkcode QueryProgramExecutorFactory} the query executor was configured with on creation, the
   *   {@linkcode QueryExecutionPlan.filteringOps}, {@linkcode QueryExecutionPlan.preSortingOps} and
   *   {@linkcode QueryExecutionPlan.postProcessingOps} are used to create {@linkcode RecordProgramExecutorFactory}
   *   instances for each of them. These instances are stores in internal variables `filteringProgram`,
   *   `preSortingProgram` and `postProcessingProgram` respectively. (The query engine may choose to cache these.)
   * - Late-sorting constraints are composed by concatenating {@linkcode AnalyzedQueryOrderByProperty} instances from
   *   the following, in this order:
   *   - {@linkcode AnalyzedObjectStoreOrderBy.nonIndexable} from {@linkcode AnalyzedObjectStoreQuery.orderBy} map's
   *     entry for key stored in {@linkcode QueryExecutionPlan.indexName}.
   *   - {@linkcode PreProcessorDependantQueryOrderBy.orderBy} from {@linkcode AnalyzedOrderBy.preProcessorDependant},
   *     retrieved from {@linkcode AnalyzedQuery.orderBy}.
   *   The collected array of {@linkcode AnalyzedQueryOrderByProperty} instances is turned into an array of
   *   {@linkcode QueryOrderBy} by accessing the {@linkcode AnalyzedQueryOrderByProperty.orderByProperty}. The
   *   resulting array is stored in the internal `additionSortingConstraints` variable.
   * - The {@linkcode AnalyzedQueryOrderByProperty} values in the {@linkcode AnalyzedObjectStoreOrderBy.indexable} from
   *   {@linkcode AnalyzedObjectStoreQuery.orderBy} map's entry for key stored in
   *   {@linkcode QueryExecutionPlan.indexName} are retried, and their
   *   {@linkcode AnalyzedQueryOrderByProperty.orderByProperty} is accessed to create an array of
   *   {@linkcode QueryOrderBy}. The resulting array is concatenated with `additionSortingConstraints` and the result
   *   is stored in the `sortingConstraints` internal variable.
   * - The internal `recordDeduplication` mode is retrieved from {@linkcode Query.recordDeduplication}.
   * - The internal `skipFirst` variable is set {@linkcode Query.skipFirst} if its value is integer, or the value
   *   of the matching query parameter, if {@linkcode Query.skipFirst} is a {@linkcode QueryParameter} instance. If the
   *   query parameter's value is not a valid {@linkcode Query.skipFirst} value, an error is thrown.
   * - The internal `recordLimit` variable is set {@linkcode Query.recordLimit} if its value is integer, or the value
   *   of the matching query parameter, if {@linkcode Query.recordLimit} is a {@linkcode QueryParameter} instance. If
   *   the query parameter's value is not a valid {@linkcode Query.recordLimit} value, an error is thrown.
   * - The internal `examinedRecordsLimit` variable is set {@linkcode Query.examinedRecordsLimit} if its value is
   *   integer, or the value of the matching query parameter, if {@linkcode Query.examinedRecordsLimit} is a
   *   {@linkcode QueryParameter} instance. If the query parameter's value is not a valid
   *   {@linkcode Query.examinedRecordsLimit} value, an error is thrown.
   * - The internal `queryExecutionContext` is set to a new {@linkcode QueryExecutionContext} instance.
   * - It initializes an internal `examinedRecordCount` counter to `0`.
   * - If {@linkcode Query.recordDeduplication} is {@linkcode RecordDeduplicationMode.DISTINCT_RECORDS}, the internal
   *   `matchedPrimaryKeys` is initialized to an empty {@linkcode Set}.
   * - An empty array `matchedRecords` is created.
   * - The query engine open a cursor by calling either {@linkcode IDBObjectStore.openCursor} if
   *   {@linkcode QueryExecutionPlan.indexName} is `null`, or {@linkcode IDBIndex.openCursor} on the index retrieved by
   *   passing {@linkcode QueryExecutionPlan.indexName} to {@linkcode IDBObjectStore.index} otherwise. The
   *   {@linkcode QueryExecutionPlan.cursorKeyRange} and {@linkcode QueryExecutionPlan.currentDirection} are passed to
   *   the `openCursor` method as arguments.
   * - The query executor creates a new pending {@linkcode IDBRequest} and returns it from this function.
   * - The query engine then iterates over the records returned by the cursor it has opened, performing the following
   *   steps for every record, until cursor's end or bailing out:
   *   - The `examinedRecordCount` counter is incremented.
   *   - If the `examinedRecordCount` is greater than `examinedRecordsLimit`, the following steps of record iteration
   *     are not performed, the internal cursor is discarded and the query engine continues with the next major step.
   *   - A new {@linkcode RecordContext} instance is created.
   *   - The `filteringProgram` is executed using the `queryExecutionContext`, created {@linkcode RecordContext}
   *     instance and the record.
   *   - If the {@linkcode RecordContext.includeRecordInQueryResult} flag is `true`, the following steps are taken:
   *     - If {@linkcode Query.recordDeduplication} is {@linkcode RecordDeduplicationMode.NONE}, the record is pushed
   *       to the `matchedRecords` array.
   *     - If {@linkcode Query.recordDeduplication} is {@linkcode RecordDeduplicationMode.DISTINCT_RECORDS}, and the
   *       record's primary key is not present in the `matchedPrimaryKeys` set, the record's primary key is added to
   *       the set and the record is pushed to the `matchedRecords` array.
   *     - If {@linkcode Query.recordDeduplication} is {@linkcode RecordDeduplicationMode.DISTINCT_VALUES}, and the
   *       record is not a copy if any of the records in the `matchedRecords`, the record is pushed to the
   *       `matchedRecords` array.
   *   - The cursor is advanced to the next record.
   * - The records in the `matchedRecords` array are iterated over and the following steps are executed on every
   *   record:
   *   - A new {@linkcode RecordContext} instance is created.
   *   - The `preSortingProgram` is executed using the `queryExecutionContext`, created {@linkcode RecordContext}
   *     instance and the record.
   * - If the `additionSortingConstraints` array is not empty, the records in the `matchedRecords` array are sorted
   *   lexicographically by the constraints in the `sortingConstraints` array.
   * - The first `skipFirst` records in the `matchedRecords` array are removed.
   * - The `matchedRecords` array is trimmed to a maximum of `recordLimit` records.
   * - The records in the `matchedRecords` array are iterated over and the following steps are executed on every
   *   record:
   *   - A new {@linkcode RecordContext} instance is created.
   *   - The `postProcessingProgram` is executed using the `queryExecutionContext`, created {@linkcode RecordContext}
   *     instance and the record.
   * - The query engine creates a new {@linkcode IDBCursorWithValue} instance and configures it with the first record
   *   in the `matchedRecords` array, with its methods configured to iterate over the content of the `matchedRecords`
   *   array.
   * - The {@linkcode IDBRequest} returned from this function is fulfilled with the created cursor for iterating over
   *   records in the `matchedRecords` array.
   *
   * @template S The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed.
   * @template I The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
   *           all pre-processors applied.
   * @template R The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
   *           all pre-processors and post-processors applied.
   * @param objectStore The object store on which the query will be executed.
   * @param query The query to execute.
   * @returns IndexedDB request that resolves to a cursor with value on success, or `null` on error. The cursor can be
   *          used to iterate through the matched records in the order specified in the query.
   */
  <S, I, R>(objectStore: IDBObjectStore, query: PreparedQuery<S, I, R>): IDBRequest<IDBCursorWithValue | null>
}
