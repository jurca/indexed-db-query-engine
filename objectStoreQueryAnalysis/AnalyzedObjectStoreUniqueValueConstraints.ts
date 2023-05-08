import AnalyzedQueryUniqueValueConstraint from '../queryAnalysis/AnalyzedQueryUniqueValueConstraint.js'

/**
 * Result of analysis of a query unique only constraints that describes which parts of the constraints can be executed
 * using an object store's indexes or primary key and which parts cannot.
 *
 * @template R The type of records stored in the {@linkcode IDBObjectStore} on which the constraints will be applied.
 */
export default interface AnalyzedObjectStoreUniqueValueConstraints<R> {
  /**
   * The name of the object store's index to which this analysis result applies. Set to `null` if this analysis result
   * applies to using the object store's primary key.
   */
  readonly indexName: string | null

  /**
   * Property value uniqueness constraints that can be applied using the given index or primary key.
   *
   * Note that uniqueness constraint applied on object store's primary key is completely discarded by the query engine,
   * because the primary key is always unique.
   */
  readonly indexable: readonly AnalyzedQueryUniqueValueConstraint<R>[]

  /**
   * Property value uniqueness constraints that cannot be applied using the given index or primary key. These
   * constraints will be applied by the query engine.
   */
  readonly nonIndexable: readonly AnalyzedQueryUniqueValueConstraint<R>[]

  /**
   * The minimal expected execution cost of accessing all properties in the {@linkcode nonIndexable} part of these
   * constraints. This is calculated as sum of {@linkcode AnalyzedQueryUniqueValueConstraint.propertyAccessCost} of the
   * {@linkcode nonIndexable} constraints.
   */
  readonly minimumPropertyAccessCost: number
}
