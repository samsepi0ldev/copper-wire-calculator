import type { CalculateInM } from '../../domain/usecases/calc-m'
import { currencyFormat } from '../../utils/formatter'

export class CalculateCopperWireInM implements CalculateInM {
  calc({
    copperBasePrice,
    linearWeight,
    wireGauge,
  }: CalculateInM.Input): string {
    const preResult = linearWeight * wireGauge
    const costOfOneMeter = wireGauge * copperBasePrice
    const costTotalXMeters = costOfOneMeter * linearWeight

    const finalWeight = preResult.toFixed(3)
    const finalPrice = costTotalXMeters.toFixed(3)

    return `${finalWeight}kg = ${currencyFormat.format(Number(finalPrice))}`
  }
}
