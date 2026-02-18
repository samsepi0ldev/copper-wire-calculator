export interface CalculateInKg {
  calc: (input: CalculateInKg.Input) => string
}

export namespace CalculateInKg {
  export type Input = {
    linearWeight: number
    copperBasePrice: number
    netWeight: number
  }
}
