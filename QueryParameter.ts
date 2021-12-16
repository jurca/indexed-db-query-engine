/**
 * Query parameter is used to create and prepare a parametrized query. This allows the query engine to perform query
 * analysis and prepare execution plan candidates which can then be re-used every time the query is to be executed with
 * a new set of parameter values (the query engine only needs to re-evaluate the costs of execution plan candidates to
 * pick the assumed best-performing execution plan).
 *
 * Query parameters can be used in places of values or value ranges (`IDBKeyRange`) in a query (e.g. record filters),
 * but cannot be used to parametrize any property path, as that would prevent performing a query analysis before
 * parameter values are provided.
 *
 * Any single query parameter may be used multiple times in a single query and acts essentially as a named placeholder.
 *
 * Note that every parameter value must be compatible with every use of the given parameter, for example, if a
 * parameter is used to limit the records returned by a query, the value must be a positive safe integer or `Infinity`.
 */
export default interface QueryParameter {
  /**
   * The name of the parameter, identifying it among parameters of a query.
   */
  readonly name: string
}
