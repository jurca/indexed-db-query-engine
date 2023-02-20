import FilterGenerator from '../uop/generator/FilterGenerator.js'
import PreProcessorDependantFilterGenerator from '../uop/generator/PreProcessorDependantFilterGenerator.js'
import PreProcessorDependantUniqueValueCheckGenerator
  from '../uop/generator/PreProcessorDependantUniqueValueCheckGenerator.js'
import PropertyProcessorApplicationGenerator from '../uop/generator/PropertyProcessorApplicationGenerator.js'
import UniqueValueCheckGenerator from '../uop/generator/UniqueValueCheckGenerator.js'
import ProgramOptimizer from '../uop/optimizer/ProgramOptimizer.js'
import QueryAnalyzer from './QueryAnalyzer.js'

/**
 * Factory for creating new {@linkcode QueryAnalyzer} instances configured with specific micro-program generators and
 * optimizer.
 */
export default interface QueryAnalyzerFactory {
  /**
   * Creates a new general-purpose {@linkcode QueryAnalyzer} that will utilize the provided micro-program generators
   * and optimizer.
   *
   * @param programGenerators Micro-program generators the analyzer will use.
   * @param programOptimizer Micro-program optimizer the analyzer will use.
   * @returns A new general-purpose query analyzer utilizing the provided micro-program generators and optimizer.
   */
  (programGenerators: MicroProgramGenerators, programOptimizer: ProgramOptimizer): QueryAnalyzer
}

/**
 * Collection of micro-program generators for use by a {@linkcode QueryAnalyzer}.
 */
export interface MicroProgramGenerators {
  /**
   * The micro-program generator for generating programs used to filter records by their property values.
   */
  readonly filterGenerator: FilterGenerator

  /**
   * The micro-program generator for generating programs used to filter records by property values provided by record
   * pre-processors.
   */
  readonly preProcessorDependantFilterGenerator: PreProcessorDependantFilterGenerator

  /**
   * The micro-program generator for generating programs applying value uniqueness checks dependant on the result of a
   * record pre-processor.
   */
  readonly preProcessorDependantUniqueValueCheckGenerator: PreProcessorDependantUniqueValueCheckGenerator

  /**
   * The micro-program generator for generating programs applying record processors.
   */
  readonly propertyProcessorApplicationGenerator: PropertyProcessorApplicationGenerator

  /**
   * The micro-program generator for generating programs applying value uniqueness checks.
   */
  readonly uniqueValueCheckGenerator: UniqueValueCheckGenerator
}
