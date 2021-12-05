/**
 * Constants for configuring how duplicate records encountered during query execution will be handled by the query
 * engine.
 */
enum RecordDeduplicationMode {
  /**
   * The query will return all examined records, including duplicates. The amount of returned duplicates depends
   * largely on how the query will be executed and which indexes (especially
   * {@link IDBIndex.multiEntry multi-entry indexes}) will be used to traverse the records in the storage. Note that
   * duplicate patterns may differ between query executions.
   */
  NONE = 'RecordDeduplicationMode.NONE',

  /**
   * Records will be deduplicated by the values of their primary keys. This the recommended mode for most queries.
   */
  DISTINCT_RECORDS = 'RecordDeduplicationMode.DISTINCT_RECORDS',

  /**
   * Records will be deduplicated by their values. If all properties (primary keys are not examined in this mode), of
   * two records match, only the first record will be returned by the query.
   */
  DISTINCT_VALUES = 'RecordDeduplicationMode.DISTINCT_VALUES',
}

export default RecordDeduplicationMode
