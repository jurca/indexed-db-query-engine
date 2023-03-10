import RecordPropertyProcessor from '../RecordPropertyProcessor.js'

/**
 * A wrapper of a record property processor providing additional metadata used by the query engine for scheduling the
 * processor's execution.
 *
 * @template I The type of the record on which the record processor is to be applied.
 * @template O The type of the record after the record processor has been applied.
 */
export default interface AnalyzedRecordPropertyProcessor<I, O> {
  /**
   * The property processor specified in the query itself.
   */
  readonly processor: RecordPropertyProcessor<I, O>

  /**
   * The closest previous (in the order desired in the query) property processor that affects the value of the property
   * processed by this property processor as input, or any of the input property's ancestors including the entire
   * record.
   */
  readonly dependsOn: AnalyzedRecordPropertyProcessor<I, O> | null

  /**
   * The total (rough and scalar) cost of applying this record property processor. The cost is calculated as
   * `processor.input.length + 1 + processor.output.length + dependsOn?.cost ?? 0`. This property serves as a heuristic
   * meant to enable the query engine to prioritize execution of filters that are cheaper to apply, which should,
   * statistically, reduce the total amount of computation necessary to execute the query (the query engine can discard
   * a record on first unmatched filter without having to test the rest of filtering constraints).
   */
  readonly cost: number

  /**
   * A rough estimate of how much computation executing the {@linkcode RecordPropertyProcessor.valueProcessor} would
   * require. This may be used by the query engine to reorder the execution of multiple record pre-processors affecting
   * query execution to execute the cheapest pre-processors first (while observing and respecting their dependencies).
   *
   * This estimate may be derived by keeping statistics on previous uses of the processor, analyzing its code or other
   * means. The value range of this property is up to the query engine's implementation.
   *
   * This value is `null` if the query engine has no reliable enough estimate available.
   */
  readonly runtimeCostEstimate: number | null
}
