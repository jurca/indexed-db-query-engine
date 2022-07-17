// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ExcludeRecordFromQueryResultOp from '../ExcludeRecordFromQueryResultOp.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import OpCode from '../OpCode.js' // eslint-disable-line @typescript-eslint/no-unused-vars
import OpImplementation from './OpImplementation.js'

/**
 * Implementation of the {@linkcode OpCode.EXCLUDE_RECORD_FROM_QUERY_RESULT} operation.
 *
 * @template R The type of the database record.
 * @see ExcludeRecordFromQueryResultOp
 */
type ExcludeRecordFromQueryResultOpImplementation<R> = OpImplementation<R, readonly []>;

export default ExcludeRecordFromQueryResultOpImplementation
