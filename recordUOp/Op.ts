import OpCode from './OpCode.js'

/**
 * Representation of a single operation to execute in a record processing micro-program. This interface is the base
 * type of specific operation representations and should not be used for anything else.
 */
export default interface Op<O extends OpCode, A extends readonly [] | readonly [unknown, ...readonly unknown[]]> {
  /**
   * The opcode representing the type of operation to perform when executing this operation.
   */
  readonly opcode: O

  /**
   * The arguments to pass to the operation, parametrizing its behavior.
   */
  readonly arguments: A
}
