// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import JumpOp from './JumpOp.js' // eslint-disable-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import OpCode from './OpCode.js' // eslint-disable-line @typescript-eslint/no-unused-vars
import OpImplementation from './OpImplementation.js'

/**
 * Implementation of the {@linkcode OpCode.JUMP} operation.
 *
 * @template R The type of the database record.
 * @see JumpOp
 */
type JumpOpImplementation<R> = OpImplementation<R, [number]>

export default JumpOpImplementation
