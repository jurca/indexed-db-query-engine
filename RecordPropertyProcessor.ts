import PropertyPath from './PropertyPath.js'
import ValueProcessor from './ValueProcessor.js'

/**
 * Record modifier that is meant to add or replace a single property in a record (or the record itself if the output
 * property path is empty) based on the value of a single property in the given record (or the record itself it the
 * input property path is empty).
 */
export default interface RecordPropertyProcessor<I, O> {
  /**
   * Property path denoting the record property which's value will be passed to the {@linkcode valueProcessor}. Using
   * an empty property path will result in passing the entire record to the value processor.
   */
  readonly input: PropertyPath<I>

  /**
   * The value processor that will be provided with the value of the record property denoted by the {@linkcode input}
   * property path. The value returned by the processor will be stored at the record property denoted by the
   * {@linkcode output} property path.
   * 
   * @see {@linkcode allowIntermediateValueOverWrite}
   */
  readonly valueProcessor: ValueProcessor<unknown, unknown>

  /**
   * Property path denoting the record property where the result of {@linkcode valueProcessor} will be stored. Using an
   * empty property path will result in replacing the record with the return value.
   */
  readonly output: PropertyPath<O>

  /**
   * If `true`, storing the return value of the {@linkcode valueProcessor} will over-write any existing non-object
   * properties with empty objects while evaluating the property path (the last property denoted by the property path
   * is always replaced by the returned value even if it exists regardless of this flag's state). If `false`, and
   * evaluating the property path encounters a non-object property that is neither `undefined` nor `null`, the process
   * of storing the result of the {@linkcode valueProcessor} will be cancelled silently.
   */
  readonly allowIntermediateValueOverWrite: boolean
}
