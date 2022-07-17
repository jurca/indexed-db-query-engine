import QueryRecordPropertyFilter from '../../QueryRecordPropertyFilter.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FilterByPropertyOp from '../FilterByPropertyOp.js' // eslint-disable-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import OpCode from '../OpCode.js' // eslint-disable-line @typescript-eslint/no-unused-vars
import OpImplementation from './OpImplementation.js'

/**
 * Implementation of the {@linkcode OpCode.FILTER_BY_PROPERTY} operation.
 *
 * @template R The type of the database record.
 * @see FilterByPropertyOp
 */
type FilterByPropertyOpImplementation<R> = OpImplementation<R, readonly [QueryRecordPropertyFilter<R>]>

export default FilterByPropertyOpImplementation
