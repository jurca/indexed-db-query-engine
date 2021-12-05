import QueryRecordPropertyFilter from './QueryRecordPropertyFilter.js'

/**
 * Descriptor of a record matching pattern. All of the filtering {@linkcode properties} must match for the record at
 * hand to pass the filter.
 */
export default interface QueryRecordFilter<R> {
  /**
   * A set of property paths and desired values ranges of record properties denoted by the respective property paths.
   */
  readonly properties: readonly QueryRecordPropertyFilter<R>[]
}
