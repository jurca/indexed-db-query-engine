import RecordPropertyProcessor from '../RecordPropertyProcessor.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ApplyRecordProcessorOp from './ApplyRecordProcessorOp.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import OpCode from './OpCode.js' // eslint-disable-line @typescript-eslint/no-unused-vars
import OpImplementation from './OpImplementation.js'

/**
 * Implementation of the {@linkcode OpCode.APPLY_RECORD_PROCESSOR} operation.
 *
 * @template R The type of the database record.
 * @template I The type of the database record after the property processor has been applied.
 * @see ApplyRecordProcessorOp
 */
type ApplyRecordProcessorOpImplementation<R, I> = OpImplementation<R, [RecordPropertyProcessor<R, I>]>

export default ApplyRecordProcessorOpImplementation
