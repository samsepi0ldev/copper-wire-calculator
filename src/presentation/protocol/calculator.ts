export interface ICalculatorProps extends Record<string, any> {
  key: string
  linearWeight: number
  copperBasePrice: number
  netWeight: number
  wireGauge: number
}

export interface ICalculator<T extends ICalculatorProps = ICalculatorProps> {
  calc: (inputs: T) => string
}
