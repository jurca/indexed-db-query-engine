import QueryRecordPropertyFilter from '../QueryRecordPropertyFilter.js'
import Op from './Op.js'
import OpCode from './OpCode.js'

/**
 * Representation of the {@linkcode OpCode.FILTER_BY_PROPERTY} operation. Its sole argument is the record property
 * filter against which the current record will be tested.
 *
 * @see OpCode.FILTER_BY_PROPERTY
 */
type FilterByPropertyOp = Op<OpCode.FILTER_BY_PROPERTY, readonly [QueryRecordPropertyFilter<unknown>]>

export default FilterByPropertyOp
