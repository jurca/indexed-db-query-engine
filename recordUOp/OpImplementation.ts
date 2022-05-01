import ParametrizedOpImplementation from './ParametrizedOpImplementation.js'

/**
 * A generalized implementation of a single operation used in a record processing micro-program. The implementation is
 * a factory function returning an implementation bound to the operation's arguments.
 *
 * @template R The type of the database record.
 * @template A The type of the operation arguments.
 */
export default interface OpImplementation<R, A extends readonly [] | readonly [unknown, ...readonly unknown[]]> {
  /**
   * Returns a query op implementation for this operation - an operation implementation that is pre-configured by the
   * provided operation arguments. This enables the query engine to cache the returned implementation for the duration
   * of query execution (or longer) and having to pass less arguments to it while executing a record processing
   * micro-program.
   *
   * @param opArgs Arguments required by the operation.
   * @returns An operation implementation bound to the provided operation arguments.
   */
  (...opArgs: A): ParametrizedOpImplementation<R>
}
