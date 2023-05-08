import {MicroProgramGenerators} from '../queryAnalysis/QueryAnalyzerFactory.js'
import ProgramOptimizer from '../uop/optimizer/ProgramOptimizer.js'
import ObjectStoreQueryAnalyzer from './ObjectStoreQueryAnalyzer.js'

/**
 * Factory for creating new {@linkcode ObjectStoreQueryAnalyzer} instances configured with specific micro-program
 * generators and optimizer.
 */
export default interface ObjectStoreQueryAnalyzerFactory {
  /**
   * Creates a new {@linkcode ObjectStoreQueryAnalyzer} that will utilize the provided micro-program generators and
   * optimizer.
   *
   * @param programGenerators Micro-program generators the analyzer will use.
   * @param programOptimizer Micro-program optimizer the analyzer will use.
   * @returns A new object store-aware query analyzer utilizing the provided micro-program generators and optimizer.
   */
  (programGenerators: MicroProgramGenerators, programOptimizer: ProgramOptimizer): ObjectStoreQueryAnalyzer
}
