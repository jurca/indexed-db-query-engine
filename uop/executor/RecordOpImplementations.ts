import ApplyRecordProcessorOpImplementation from '../implementation/ApplyRecordProcessorOpImplementation.js'
import ExcludeRecordFromQueryResultOpImplementation
  from '../implementation/ExcludeRecordFromQueryResultOpImplementation.js'
import ExitOpImplementation from '../implementation/ExitOpImplementation.js'
import FilterByPropertyOpImplementation from '../implementation/FilterByPropertyOpImplementation.js'
import FilterForUniquenessOpImplementation from '../implementation/FilterForUniquenessOpImplementation.js'
import JumpIfLastOpResultMatchOpImplementation from '../implementation/JumpIfLastOpResultMatchOpImplementation.js'
import JumpOpImplementation from '../implementation/JumpOpImplementation.js'
import OpCode from '../OpCode.js'
import OpImplementation from '../implementation/OpImplementation.js'

/**
 * Implementations of micro-operations for processing records during query execution. This interface is meant for
 * passing the implementations for individual micro-operations together, and to make extending the instruction set
 * easier to implement without having to modify as many interfaces.
 *
 * @template R The type of the database record.
 * @template I The type of the database record with any of the pre-processors applied.
 */
export default interface RecordOpImplementations<R, I> extends RecordOpImplementationsShape<R> {
  /**
   * Implementation for the {@linkcode OpCode.APPLY_RECORD_PROCESSOR} operation.
   */
  readonly [OpCode.APPLY_RECORD_PROCESSOR]: ApplyRecordProcessorOpImplementation<R, I>

  /**
   * Implementation for the {@linkcode OpCode.FILTER_BY_PROPERTY} operation.
   */
  readonly [OpCode.FILTER_BY_PROPERTY]: FilterByPropertyOpImplementation<R>

  /**
   * Implementation for the {@linkcode OpCode.FILTER_FOR_UNIQUENESS} operation.
   */
  readonly [OpCode.FILTER_FOR_UNIQUENESS]: FilterForUniquenessOpImplementation<R>

  /**
   * Implementation for the {@linkcode OpCode.EXCLUDE_RECORD_FROM_QUERY_RESULT} operation.
   */
  readonly [OpCode.EXCLUDE_RECORD_FROM_QUERY_RESULT]: ExcludeRecordFromQueryResultOpImplementation<R>

  /**
   * Implementation for the {@linkcode OpCode.JUMP} operation.
   */
  readonly [OpCode.JUMP]: JumpOpImplementation<R>

  /**
   * Implementation for the {@linkcode OpCode.JUMP_IF_LAST_OP_RESULT_MATCH} operation.
   */
  readonly [OpCode.JUMP_IF_LAST_OP_RESULT_MATCH]: JumpIfLastOpResultMatchOpImplementation<R>

  /**
   * Implementation for the {@linkcode OpCode.EXIT} operation.
   */
  readonly [OpCode.EXIT]: ExitOpImplementation<R>
}

/**
 * This is a helper internal type used to help ensure that the RecordOpImplementations interface is designed correctly.
 *
 * @template R The type of the database record.
 */
type RecordOpImplementationsShape<R> = {
  readonly [opCode in OpCode]: OpImplementation<R, readonly [never, ...readonly never[]]>
}
