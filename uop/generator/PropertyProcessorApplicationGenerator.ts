import RecordPropertyProcessor from '../../RecordPropertyProcessor.js'
import RecordOp from '../RecordOp.js'

/**
 * Micro-operation code generator to be used by the query engine for generating code fragments applying the provided
 * record processors.
 */
export default interface PropertyProcessorApplicationGenerator {
  /**
   * Generates a micro-code fragment that will apply all of the provided record processors in the order they were
   * provided.
   *
   * @template I The type of the record on which the record processors are to be applied.
   * @template O The type of the record after any of the record processors have been applied.
   * @param recordProcessors The record processors to be applied by the generated code. The provided array may be
   *        empty, resulting in an empty code fragment being generated.
   * @returns A code (sequence of micro-operations) that applies the provided record processors.
   */
  <I, O>(recordProcessors: readonly RecordPropertyProcessor<I, O>[]): RecordOp[]
}
