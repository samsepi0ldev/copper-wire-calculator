import type { CalculateInKg } from '../domain/usecases/calc-kg'
import type { CalculateInM } from '../domain/usecases//calc-m'
import type { ICalculator, ICalculatorProps } from './protocol/calculator'

interface StrategyFn {
  calc: (input: any) => string
}

export class CalculateCopperWire implements ICalculator {
  private calStrategy: Map<string, StrategyFn> = new Map()

  constructor(calcM: CalculateInM, calcKg: CalculateInKg) {
    this.calStrategy.set('m', calcM)
    this.calStrategy.set('kg', calcKg)
  }

  calc({
    key,
    copperBasePrice,
    linearWeight,
    netWeight,
    wireGauge,
  }: ICalculatorProps): string {
    const strategy = this.calStrategy.get(key)

    if (!strategy) {
      throw new Error('System not implemented')
    }

    return strategy.calc({
      copperBasePrice,
      linearWeight,
      netWeight,
      wireGauge,
    })
  }
}
