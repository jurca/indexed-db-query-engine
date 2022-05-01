import QueryUniqueValueConstraint from '../QueryUniqueValueConstraint.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FilterForUniquenessOp from './FilterForUniquenessOp.js' // eslint-disable-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import OpCode from './OpCode.js' // eslint-disable-line @typescript-eslint/no-unused-vars
import OpImplementation from './OpImplementation.js'

/**
 * Implementation of the {@linkcode OpCode.FILTER_FOR_UNIQUENESS} operation.
 *
 * @template R The type of the database record.
 * @see FilterForUniquenessOp
 */
type FilterForUniquenessOpImplementation<R> = OpImplementation<R, [QueryUniqueValueConstraint<R>]>

export default FilterForUniquenessOpImplementation
