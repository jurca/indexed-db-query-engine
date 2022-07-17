import Op from './Op.js'
import OpCode from './OpCode.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import RecordContext from './executor/RecordContext.js' // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Representation of the {@linkcode OpCode.JUMP} operation. Its sole argument is the delta to add to the
 * {@linkcode RecordContext.opIndex} program counter.
 *
 * @see OpCode.JUMP
 */
type JumpOp = Op<OpCode.JUMP, readonly [number]>

export default JumpOp
