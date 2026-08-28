export interface CalculateInM {
  calc: (input: CalculateInM.Input) => string
}

export namespace CalculateInM {
  export type Input = {
    linearWeight: number
    copperBasePrice: number
    wireGauge: number
  }
}
