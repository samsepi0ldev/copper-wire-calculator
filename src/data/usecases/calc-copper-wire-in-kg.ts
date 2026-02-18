import type { CalculateInKg } from '../../domain/usecases/calc-kg'
import { currencyFormat } from '../../utils/formatter'

export class CalculateCopperWireInKg implements CalculateInKg {
  calc({
    copperBasePrice,
    linearWeight,
    netWeight,
  }: CalculateInKg.Input): string {
    const aux1 = 15.0 * linearWeight
    const aux2 = aux1 / netWeight
    const preFinalPrice = linearWeight * copperBasePrice

    const finalLongitude = aux2.toFixed(3)
    const finalPrice = preFinalPrice.toFixed(3)

    return `${finalLongitude}m = ${currencyFormat.format(Number(finalPrice))}`
  }
}
