interface DiameterEntry {
  readonly diameter: number
  readonly weight: number
}

export const DIAMETER_DATA: Record<string, DiameterEntry> = {
  '1': { diameter: 0.126, weight: 1.9 },
  '2': { diameter: 0.16, weight: 2.4 },
  '3': { diameter: 0.206, weight: 3.1 },
  '4': { diameter: 0.28, weight: 4.2 },
  '5': { diameter: 0.353, weight: 5.3 },
  '6': { diameter: 0.44, weight: 6.6 },
}
