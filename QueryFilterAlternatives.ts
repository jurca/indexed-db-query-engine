import QueryRecordFilter from './QueryRecordFilter.js'

/**
 * Descriptor of record matching patters to use against records during query execution. A record passes the filter if
 * it is matched by any of the pattern {@linkcode alternatives}.
 */
export default interface QueryFilterAlternatives<R> {
  /**
   * Record matching patterns to match the records against. Using an empty array will result in no value matching-based
   * filtering applied to the records.
   */
  readonly alternatives: readonly QueryRecordFilter<R>[]
}
