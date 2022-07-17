import QueryUniqueValueConstraint from '../QueryUniqueValueConstraint.js'
import Op from './Op.js'
import OpCode from './OpCode.js'

/**
 * Representation of the {@linkcode OpCode.FILTER_FOR_UNIQUENESS} operation. Its sole argument is the unique value
 * constraint against which the current record will be tested.
 *
 * @see OpCode.FILTER_FOR_UNIQUENESS
 */
type FilterForUniquenessOp = Op<OpCode.FILTER_FOR_UNIQUENESS, readonly [QueryUniqueValueConstraint<unknown>]>

export default FilterForUniquenessOp
