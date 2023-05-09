# IndexedDB query engine design specification

This repository houses the design of the API and proposed internal workings of
a general-purpose non-aggregating query engine for the web browser-provided
[IndexedDB document database](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

The query engine supports query analysis, optimization & preparation, user
functions, and parameterized queries.

Since this is a non-aggregating query engine, it does not support operations
performed on sets of records, or spanning multiple object stores.

Note that some details in this specification are deliberately left out, as this
specification serves primarily as a proposal, meant to open the discussion
about adding a more high-level API for using the Indexed DB API. That being
said, this proposal aims to be detailed enough to make implementing it
approachable and mostly straight-forward for a skilled-enough developer (with
most of the code hopefully generable by a powerful-enough GPT artificial neural
network).

## Proposed API

This specification [augments](IDBObjectStore.ts) the API of
[`IDBObjectStore`](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore)
with new methods for using queries, and updates some methods with query
support.

These methods provide means for using [queries](Query.ts), or
[prepared queries](queryPreparation/PreparedQuery.ts), for querying an object
store for records. I suggest starting here to get a rough idea on what this
repository proposes.

## Proposed under-the-hood behavior

Whenever a new connection to an IndexedDB database is opened, the database will
create a new [`QueryAnalyzer`](queryAnalysis/QueryAnalyzer.ts) using the
[`QueryAnalyzerFactory`](queryAnalysis/QueryAnalyzerFactory.ts),
[`ObjectStoreQueryAnalyzer`](objectStoreQueryAnalysis/ObjectStoreQueryAnalyzer.ts)
using the
[`ObjectStoreQueryAnalyzerFactory`](objectStoreQueryAnalysis/ObjectStoreQueryAnalyzerFactory.ts),
[`QueryPreparer`](queryPreparation/QueryPreparer.ts) using the
[`QueryPreparerFactory`](queryPreparation/QueryPreparerFactory.ts),
[`QueryProgramExecutorFactory`](uop/executor/QueryProgramExecutorFactory.ts)
using the
[`OpExecutorFactory`](uop/executor/OpExecutorFactory.ts), and
[`QueryExecutor`](queryExecution/QueryExecutor.ts) using the
[`QueryExecutorFactory`](queryExecution/QueryExecutorFactory.ts) under the
hood and keeps those instances associated with the database connection.

When a [`Query`](Query.ts) is to be executed or prepared for execution, and the
query engine does not posses a cached
[`PreparedQuery`](queryPreparation/PreparedQuery.ts) for the input query, it
prepares the query using the following steps:

- The query engine passes the query to the previously created
  [`QueryAnalyzer`](queryAnalysis/QueryAnalyzer.ts) instance to produce an
  [`AnalyzedQuery`](queryAnalysis/AnalyzedQuery.ts) for the input query.

  This step is skipped if the query engine already has a cached an
  `AnalyzedQuery` for the input query.
- The query engine passes the [`AnalyzedQuery`](queryAnalysis/AnalyzedQuery.ts)
  to the previously created
  [`ObjectStoreQueryAnalyzer`](objectStoreQueryAnalysis/ObjectStoreQueryAnalyzer.ts)
  to create an
  [`AnalyzedObjectStoreQuery`](objectStoreQueryAnalysis/AnalyzedObjectStoreQuery.ts)
  for the input query and the object store for which the query is prepared.

  This step is skipped if the query engine already has a cached
  `AnalyzedObjectStoreQuery` for the input query and object store (the query
  engine may also reuse an `AnalyzedObjectStoreQuery` for the input query
  created for a different object store that matches all properties of the
  target object store).
- The query engine then passes the
  [`AnalyzedObjectStoreQuery`](objectStoreQueryAnalysis/AnalyzedObjectStoreQuery.ts)
  to the previously created
  [`QueryPreparer`](queryPreparation/QueryPreparer.ts) to create a
  [`PreparedQuery`](queryPreparation/PreparedQuery.ts) for the input query and
  the object store for which the query is prepared.

The prepared query is then executed using the previously created
[`QueryExecutor`](queryExecution/QueryExecutor.ts) instance.
