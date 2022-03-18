import Op from './Op.js'
import OpCode from './OpCode.js'

/**
 * Representation of the {@linkcode OpCode.EXCLUDE_RECORD_FROM_QUERY_RESULT} operation.
 *
 * @see OpCode.EXCLUDE_RECORD_FROM_QUERY_RESULT
 */
type ExcludeRecordFromQueryResultOp = Op<OpCode.EXCLUDE_RECORD_FROM_QUERY_RESULT, []>

export default ExcludeRecordFromQueryResultOp
