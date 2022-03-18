import Op from './Op.js'
import OpCode from './OpCode.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import RecordContext from './RecordContext.js' // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Representation of the {@linkcode OpCode.JUMP_IF_LAST_OP_RESULT_MATCH} operation. The first argument is the state
 * against which the {@linkcode RecordContext.lastOpSuccess} is matched, the second argument is the delta to add to the
 * {@linkcode RecordContext.opIndex} program counter if the state matches.
 *
 * @see OpCode.JUMP_IF_LAST_OP_RESULT_MATCH
 */
type JumpIfLastOpResultMatchOp = Op<OpCode.JUMP_IF_LAST_OP_RESULT_MATCH, [boolean, number]>

export default JumpIfLastOpResultMatchOp
