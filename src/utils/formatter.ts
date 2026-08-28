export const currencyFormat = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const maskOnlyNumbersAndDot = (value: string): string => {
  return value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
}

export const maskCurrency = (value: number | string): string => {
  const numberValue = typeof value === 'string' ? Number(value) : value
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numberValue || 0)
}

export const unmaskCurrency = (value: string): number => {
  return Number(value.replace(/\D/g, '')) / 100
}
