// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ExitOp from './ExitOp.js' // eslint-disable-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import OpCode from './OpCode.js' // eslint-disable-line @typescript-eslint/no-unused-vars
import OpImplementation from './OpImplementation.js'

/**
 * Implementation of the {@linkcode OpCode.EXIT} operation.
 *
 * @template R The type of the database record.
 * @see ExitOp
 */
type ExitOpImplementation<R> = OpImplementation<R, readonly []>

export default ExitOpImplementation
