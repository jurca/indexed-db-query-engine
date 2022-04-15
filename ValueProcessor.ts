/**
 * ValueProcessor is a function that computes a value based on the provided value. It is strongly recommended to use a
 * pure function (a function that always returns identical values for identical input, regardless of what the input
 * value is, and does not modify the input itself or any variable/value declared outside its body).
 *
 * @template I The type of the input value processed by this value processor.
 * @template O The type of the value returned by this value processor.
 */
export default interface ValueProcessor<I, O> {
  (value: I): O
}
