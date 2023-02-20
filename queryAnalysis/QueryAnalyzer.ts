import Query from '../Query.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import QueryRecordFilter from '../QueryRecordFilter.js' // eslint-disable-line @typescript-eslint/no-unused-vars
import AnalyzedQuery from './AnalyzedQuery.js'

/**
 * General-purpose query analyzer performing query analysis and optimization that is not specific to any object store
 * or index.
 */
export default interface QueryAnalyzer {
  /**
   * Performs general analysis and optimization of the provided query. The analyzer performs at least the following
   * operations:
   * 
   * - Removal of duplicate {@linkcode Query.filter}, {@linkcode Query.onlyUnique} and {@linkcode Query.orderBy}
   *   clauses.
   * - Filter analysis and optimization:
   *   - Computation of intersections of all ranges applied to the same property within a single query filter
   *     alternative ({@linkcode QueryRecordFilter}).
   *   - Merge of alternatives with only overlapping or touching value ranges applied to the same properties.
   *   - Resolution of the greatest common denominator record pattern for all filter alternatives (to be used as
   *     {@linkcode AnalyzedQuery.mainFilter}).
   * - Reorganization of query filters into {@linkcode AnalyzedQuery.mainFilter} and
   *   {@linkcode AnalyzedQuery.additionalFilterAlternatives} while separating filters dependant on record
   *   preprocessors from the rest.
   * - Reorganization of query's {@linkcode Query.orderBy} clauses to {@linkcode AnalyzedQuery.orderBy} by separating
   *   the clauses dependant on pre-processors from the rest.
   * - Examination of the preprocessors, the dependencies between them, and calculation of their approximate execution
   *   costs.
   * - Separation of the preprocessors that can be executed after filtering and sorting the records without affecting
   *   the query's result from the remaining preprocessors into {@linkcode AnalyzedQuery.recordPreProcessor} and
   *   {@linkcode AnalyzedQuery.postponedRecordPreProcessor}. Note that only the output paths of pre-processors matter
   *   for the distinction.
   * - Generation of the {@linkcode AnalyzedQuery.mainFilteringOps}, {@linkcode AnalyzedQuery.additionalFilteringOps},
   *   {@linkcode AnalyzedQuery.preSortingOps} and {@linkcode AnalyzedQuery.postProcessingOps} micro-programs that
   *   handle execution of the query that is dependant on record processors.
   *
   * @template S The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed.
   * @template I The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
   *           all pre-processors applied.
   * @template R The type of records stored in the {@linkcode IDBObjectStore} on which the query will be executed, with
   *           all pre-processors and post-processors applied.
   * @param query The query to analyze. The query will not be modified.
   * @returns Result of the analyses of the provided query. The query engine may cache the result.
   */
  <S, I, R>(query: Query<S, I, R>): AnalyzedQuery<S, I, R>
}
