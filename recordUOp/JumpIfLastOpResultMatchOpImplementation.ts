// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import JumpIfLastOpResultMatchOp from './JumpIfLastOpResultMatchOp.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import OpCode from './OpCode.js' // eslint-disable-line @typescript-eslint/no-unused-vars
import OpImplementation from './OpImplementation.js'

/**
 * Implementation of the {@linkcode OpCode.JUMP_IF_LAST_OP_RESULT_MATCH} operation.
 *
 * @template R The type of the database record.
 * @see JumpIfLastOpResultMatchOp
 */
type JumpIfLastOpResultMatchOpImplementation<R> = OpImplementation<R, readonly [boolean, number]>

export default JumpIfLastOpResultMatchOpImplementation
