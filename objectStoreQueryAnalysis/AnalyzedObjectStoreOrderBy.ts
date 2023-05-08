import AnalyzedQueryOrderByProperty from '../queryAnalysis/AnalyzedQueryOrderByProperty.js'

/**
 * Result of analysis of query record sorting constraints that describes which constraints can be executed using the
 * object store's indexes or primary key and which parts cannot.
 *
 * @template R The type of records stored in the {@linkcode IDBObjectStore} that will be sorted.
 */
export default interface AnalyzedObjectStoreOrderBy<R> {
  /**
   * The name of the object store's index to which this analysis result applies. Set to `null` if this analysis result
   * applies to using the object store's primary key.
   */
  readonly indexName: string | null

  /**
   * The part of the sorting constraints until the first that cannot be executed by the given index or primary key.
   */
  readonly indexable: readonly AnalyzedQueryOrderByProperty<R>[]

  /**
   * The part of the sorting constraints since the first that cannot be executed by the given index or primary key.
   */
  readonly nonIndexable: readonly AnalyzedQueryOrderByProperty<R>[]

  /**
   * The minimal expected execution cost of accessing all properties in the {@linkcode nonIndexable} part of these
   * constraints. This is calculated as sum of {@linkcode AnalyzedQueryOrderByProperty.propertyAccessCost} of the
   * {@linkcode nonIndexable} constraints.
   */
  readonly minimumPropertyAccessCost: number
}
