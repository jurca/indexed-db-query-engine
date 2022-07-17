import ApplyRecordProcessorOp from './ApplyRecordProcessorOp.js'
import ExcludeRecordFromQueryResultOp from './ExcludeRecordFromQueryResultOp.js'
import ExitOp from './ExitOp.js'
import FilterByPropertyOp from './FilterByPropertyOp.js'
import FilterForUniquenessOp from './FilterForUniquenessOp.js'
import JumpIfLastOpResultMatchOp from './JumpIfLastOpResultMatchOp.js'
import JumpOp from './JumpOp.js'

/**
 * A union type of all record processing micro-program operations. This type is meant to be used wherever a record
 * processing micro-program is represented.
 */
type RecordOp =
  ApplyRecordProcessorOp |
  FilterByPropertyOp |
  FilterForUniquenessOp |
  ExcludeRecordFromQueryResultOp |
  JumpOp |
  JumpIfLastOpResultMatchOp |
  ExitOp

export default RecordOp
