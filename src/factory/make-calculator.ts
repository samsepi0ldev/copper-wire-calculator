import { CalculateCopperWireInKg } from '../data/usecases/calc-copper-wire-in-kg'
import { CalculateCopperWireInM } from '../data/usecases/calc-copper-wire-in-m'
import { CalculateCopperWire } from '../presentation/calculator'

export function makeCalculator() {
  const calculatorIM = new CalculateCopperWireInM()
  const calculatorIKg = new CalculateCopperWireInKg()
  const calculator = new CalculateCopperWire(calculatorIM, calculatorIKg)
  return calculator
}
