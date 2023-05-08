import ProgramOptimizer from '../uop/optimizer/ProgramOptimizer.js'
import QueryPreparer from './QueryPreparer.js'

/**
 * Factory for creating new {@linkcode QueryPreparer} instances configured with specific micro-program optimizer.
 */
export default interface QueryPreparerFactory {
  /**
   * Creates a new {@linkcode QueryPreparer} instance that will use the provided program optimizer.
   *
   * @param programOptimizer Micro-program optimizer the preparer will use.
   * @returns A new query preparer that will use the provided program optimizer.
   */
  (programOptimizer: ProgramOptimizer): QueryPreparer
}
