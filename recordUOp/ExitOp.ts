import Op from './Op.js'
import OpCode from './OpCode.js'

/**
 * Representation of the {@linkcode OpCode.EXIT} operation.
 *
 * @see OpCode.EXIT
 */
type ExitOp = Op<OpCode.EXIT, []>

export default ExitOp
