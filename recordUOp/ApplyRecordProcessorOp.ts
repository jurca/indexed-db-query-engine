import RecordPropertyProcessor from '../RecordPropertyProcessor.js'
import Op from './Op.js'
import OpCode from './OpCode.js'

/**
 * Representation of the {@linkcode OpCode.APPLY_RECORD_PROCESSOR} operation. Its sole argument is the record property
 * processor to apply on the current record.
 *
 * @see OpCode.APPLY_RECORD_PROCESSOR
 */
type ApplyRecordProcessorOp = Op<OpCode.APPLY_RECORD_PROCESSOR, [RecordPropertyProcessor<unknown, unknown>]>

export default ApplyRecordProcessorOp
